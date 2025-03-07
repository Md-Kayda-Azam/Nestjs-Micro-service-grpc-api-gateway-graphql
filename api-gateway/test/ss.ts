
  // Login
  async login(data: LoginData): Promise<any> {
    console.log(data, 'auth service');
    const user = await this.authModel.findOne({ email: data.email }).exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Email not found. Please provide a registered email address.',
      });
    }

    if (!user.isVerified) {
      throw new RpcException({
        code: grpc.status.FAILED_PRECONDITION,
        message: 'Account not verified. Verify your email to proceed.',
      });
    }

    if (
      !user.password ||
      !(await bcrypt.compare(data.password, user.password))
    ) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid credentials. Check your email and password.',
      });
    }

    // 2. ডিভাইস ইনফরমেশন সংগ্রহ
    // const userAgent = metadata.get('user-agent')?.[0]?.toString() || 'Unknown';
    const userAgent = 'Unknown';
    const ipData = await IpAddressGet(); // ধরে নিচ্ছি এটা একটা ফাংশন যা IP ডাটা রিটার্ন করে
    const ipAddress = ipData.ip;
    const location = `${ipData.city}, ${ipData.country}`;
    const deviceId = generateDeviceId(ipAddress, 'userAgent', 'en-US');

    // 3. ডিভাইস ম্যানেজমেন্ট
    user.devices = user.devices || []; // নিশ্চিত করা যে devices অ্যারে আছে
    const existingDevice = user.devices.find(
      (d: Device) => d.deviceId === deviceId,
    );

    if (!existingDevice) {
      const newDevice: Device = {
        deviceId,
        ipAddress,
        userAgent,
        location,
      };
      user.devices.push(newDevice);

      // সিকিউরিটি অ্যালার্ট (শুধু যদি এটা প্রথম ডিভাইস না হয়)
      if (user.devices.length > 1) {
        await sendSecurityAlertEmail(
          user.email,
          location,
          ipAddress,
          userAgent,
        );
      }
    } else {
      // বিদ্যমান ডিভাইস আপডেট
      existingDevice.ipAddress = ipAddress;
      existingDevice.userAgent = userAgent;
      existingDevice.location = location;
    }

    // 4. JWT টোকেন জেনারেট
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      deviceId,
      ipAddress,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: this.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.REFRESH_SECRET,
    });

    // 5. ইউজার আপডেট এবং সেভ
    user.refreshToken = refreshToken;
    user.lastActive = new Date();
    await user.save();
    console.log(
      accessToken,
      refreshToken,
      user._id.toString(),
      user.email,
      user.firstName,
      user.lastName,
      user.role,
    );

    // 6. রেসপন্স রিটার্ন
    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }