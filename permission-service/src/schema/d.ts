// mutation {
//     createManyPermissions(createManyPermissionsInput: {
//       permissions: [
//         # User (Super Admin, School Admin)
//         { name: "user:view", description: "View user details" },
//         { name: "user:create", description: "Create new user" },
//         { name: "user:update", description: "Update user details" },
//         { name: "user:delete", description: "Delete user" },
//         { name: "user:manage-roles", description: "Manage user roles and permissions" },

//         # School
//         { name: "school:view", description: "View school details" },
//         { name: "school:create", description: "Create new school" },
//         { name: "school:update", description: "Update school details" },
//         { name: "school:delete", description: "Delete school" },

//         # Class
//         { name: "class:view", description: "View class details" },
//         { name: "class:create", description: "Create new class" },
//         { name: "class:update", description: "Update class details" },
//         { name: "class:delete", description: "Delete class" },

//         # Student
//         { name: "student:view", description: "View student details" },
//         { name: "student:create", description: "Create new student" },
//         { name: "student:update", description: "Update student details" },
//         { name: "student:delete", description: "Delete student" },
//         { name: "student:manage-attendance", description: "Manage student attendance" },
//         { name: "student:view-performance", description: "View student performance" },

//         # Teacher
//         { name: "teacher:view", description: "View teacher details" },
//         { name: "teacher:create", description: "Create new teacher" },
//         { name: "teacher:update", description: "Update teacher details" },
//         { name: "teacher:delete", description: "Delete teacher" },
//         { name: "teacher:manage-attendance", description: "Manage teacher attendance" },
//         { name: "teacher:manage-salary", description: "Manage teacher salary and bonus" },
//         { name: "teacher:view-performance", description: "View teacher performance" },
//         { name: "teacher:give-feedback", description: "Give feedback to teachers" },
//         { name: "teacher:view-feedback", description: "View teacher feedback" },
//         { name: "teacher:rate", description: "Rate teachers" },

//         # Parent
//         { name: "parent:view", description: "View parent details" },
//         { name: "parent:create", description: "Create new parent" },
//         { name: "parent:update", description: "Update parent details" },
//         { name: "parent:delete", description: "Delete parent" },

//         # Attendance
//         { name: "attendance:view-student", description: "View student attendance" },
//         { name: "attendance:manage-student", description: "Manage student attendance" },
//         { name: "attendance:view-teacher", description: "View teacher attendance" },
//         { name: "attendance:manage-teacher", description: "Manage teacher attendance" },
//         { name: "attendance:view-school", description: "View school-wide attendance analytics" },

//         # Grade
//         { name: "grade:view", description: "View grades" },
//         { name: "grade:create", description: "Create new grade" },
//         { name: "grade:update", description: "Update grades" },
//         { name: "grade:delete", description: "Delete grades" },

//         # Assignment
//         { name: "assignment:view", description: "View assignments" },
//         { name: "assignment:create", description: "Create new assignment" },
//         { name: "assignment:update", description: "Update assignment" },
//         { name: "assignment:delete", description: "Delete assignment" },
//         { name: "assignment:submit", description: "Submit assignment (for students)" },
//         { name: "assignment:grade", description: "Grade assignments (for teachers)" },

//         # Admission (Payment)
//         { name: "admission:view", description: "View admission details" },
//         { name: "admission:create", description: "Create new admission" },
//         { name: "admission:update", description: "Update admission details" },
//         { name: "admission:delete", description: "Delete admission" },
//         { name: "admission:manage-payment", description: "Manage admission payments" },

//         # Teacher Tasks
//         { name: "teacher-task:view", description: "View teacher tasks" },
//         { name: "teacher-task:create", description: "Create new teacher task" },
//         { name: "teacher-task:update", description: "Update teacher task" },
//         { name: "teacher-task:delete", description: "Delete teacher task" },

//         # Time Table
//         { name: "timetable:view", description: "View timetable" },
//         { name: "timetable:create", description: "Create new timetable" },
//         { name: "timetable:update", description: "Update timetable" },
//         { name: "timetable:delete", description: "Delete timetable" },

//         # Notification
//         { name: "notification:view", description: "View notifications" },
//         { name: "notification:create", description: "Create new notification" },
//         { name: "notification:update", description: "Update notification" },
//         { name: "notification:delete", description: "Delete notification" },

//         # Exam
//         { name: "exam:view", description: "View exams" },
//         { name: "exam:create", description: "Create new exam" },
//         { name: "exam:update", description: "Update exam" },
//         { name: "exam:delete", description: "Delete exam" },

//         # Results
//         { name: "result:view", description: "View exam results" },
//         { name: "result:create", description: "Create new result" },
//         { name: "result:update", description: "Update result" },
//         { name: "result:delete", description: "Delete result" },

//         # Teacher Salary
//         { name: "teacher-salary:view", description: "View teacher salary" },
//         { name: "teacher-salary:create", description: "Create new salary entry" },
//         { name: "teacher-salary:update", description: "Update salary details" },
//         { name: "teacher-salary:delete", description: "Delete salary entry" },
//         { name: "teacher-salary:manage-bonus", description: "Manage teacher bonus" },

//         # Student Monthly Fee
//         { name: "student-fee:view", description: "View student fees" },
//         { name: "student-fee:create", description: "Create new fee entry" },
//         { name: "student-fee:update", description: "Update fee details" },
//         { name: "student-fee:delete", description: "Delete fee entry" },
//         { name: "student-fee:manage-payment", description: "Manage fee payments" },

//         # Events
//         { name: "event:view", description: "View events" },
//         { name: "event:create", description: "Create new event" },
//         { name: "event:update", description: "Update event details" },
//         { name: "event:delete", description: "Delete event" },
//         { name: "event:manage-participants", description: "Manage event participants" },

//         # Announcement
//         { name: "announcement:view", description: "View announcements" },
//         { name: "announcement:create", description: "Create new announcement" },
//         { name: "announcement:update", description: "Update announcement" },
//         { name: "announcement:delete", description: "Delete announcement" },

//         # Book
//         { name: "book:view", description: "View books" },
//         { name: "book:create", description: "Create new book" },
//         { name: "book:update", description: "Update book details" },
//         { name: "book:delete", description: "Delete book" },

//         # Subject
//         { name: "subject:view", description: "View subjects" },
//         { name: "subject:create", description: "Create new subject" },
//         { name: "subject:update", description: "Update subject details" },
//         { name: "subject:delete", description: "Delete subject" },

//         # Followers
//         { name: "follow:follow", description: "Follow users/schools" },
//         { name: "follow:unfollow", description: "Unfollow users/schools" },
//         { name: "follow:view", description: "View followers/following" },

//         # Students Analytics
//         { name: "student-analytics:view-performance", description: "View student performance analytics" },
//         { name: "student-analytics:view-class-performance", description: "View class performance analytics" },
//         { name: "student-analytics:view-subject-performance", description: "View subject performance analytics" },

//         # Teachers Analytics
//         { name: "teacher-analytics:view-performance", description: "View teacher performance analytics" },
//         { name: "teacher-analytics:view-attendance", description: "View teacher attendance analytics" },
//         { name: "teacher-analytics:view-salary", description: "View teacher salary analytics" },
//         { name: "teacher-analytics:view-feedback", description: "View teacher feedback analytics" },
//         { name: "teacher-analytics:view-rating", description: "View teacher rating analytics" },

//         # Profit & Expense
//         { name: "finance:view-income", description: "View school income" },
//         { name: "finance:view-expense", description: "View school expenses" },
//         { name: "finance:view-profit-loss", description: "View profit and loss" },
//         { name: "finance:manage-tax", description: "Manage tax" },
//         { name: "finance:view-report", description: "View financial reports" },

//         # School-Wide Analytics
//         { name: "school-analytics:view-performance", description: "View school performance analytics" },
//         { name: "school-analytics:view-financial", description: "View school financial analytics" },
//         { name: "school-analytics:view-attendance", description: "View school attendance analytics" },
//         { name: "school-analytics:view-student", description: "View school student analytics" },

//         # Message
//         { name: "message:view", description: "View messages" },
//         { name: "message:send", description: "Send messages" },
//         { name: "message:delete", description: "Delete messages" },
//         { name: "message:manage-chat", description: "Manage chats" },

//         # Subscription
//         { name: "subscription:view-plan", description: "View subscription plans" },
//         { name: "subscription:manage-plan", description: "Manage subscription plans" },
//         { name: "subscription:view-school-subscription", description: "View school subscriptions" },
//         { name: "subscription:manage-school-subscription", description: "Manage school subscriptions" },
//         { name: "subscription:manage-payment", description: "Manage subscription payments" }
//       ]
//     }) {
//       permissions {
//         _id
//         name
//         description
//         isActive
//         createdAt
//         updatedAt
//       }
//     }
//   }
