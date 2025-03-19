import { z } from "zod";

const authenticationSchema = z.object({
  authority: z.string().nonempty("* Authority is required"),
  employeeId: z
    .string()
    .regex(/^\d{3}$/, "* Employee ID must be exactly 3 digits"),
  password: z.string().min(6, "* Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email("* Invalid email format")
    .nonempty("* Email is required"),
});

const createEmployeeSchema = z.object({
  employeeId: z
    .string()
    .regex(/^\d{3}$/, "* Employee ID must be exactly 3 digits"),
  name: z.string().min(6, "* Full name must be at least 6 characters"),
  email: z
    .string()
    .email("* Invalid email address")
    .min(6, "* Email must be at least 6 characters"),
  password: z.string().min(6, "* Password must be at least 6 characters"),
  dob: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "* Date of Birth must be in YYYY-MM-DD format"
    ),
  phoneNumber: z
    .string()
    .length(11, "* Phone number must be exactly 11 digits")
    .regex(
      /^03\d{9}$/,
      "* Phone number must start with '03' and contain only digits"
    ),
  gender: z.enum(["Male", "Female"]),
  martialStatus: z.enum(["Single", "Married"]),
  address: z.object({
    street: z.string().min(1, "* Street is required"),
    city: z.string().min(1, "* City is required"),
    state: z.string().min(1, "* State is required"),
    postalCode: z.string().min(1, "* Postal Code is required"),
    country: z.string().min(1, "* Country is required"),
  }),

  department: z.string().min(1, "* Department is required"),
  role: z.string().min(1, "* Role is required"),
  salary: z.string().regex(/^\d+$/, "* Salary must be a number"),
  shift: z.enum(["Morning", "Evening", "Night"]),
  status: z.enum(["Active", "Inactive", "Leave"]),
  dateOfJoining: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "* Date of Joining must be in YYYY-MM-DD format"
    ),
  employmentType: z.enum(["Full-Time", "Part-Time"]),
  bankDetails: z.object({
    accountNumber: z
      .string()
      .min(8, "* Account number must be at least 8 digits")
      .max(16, "* Account number cannot exceed 16 digits")
      .regex(/^\d+$/, "* Account number must contain only digits"),
    bankName: z.enum(["HBL", "ABL", "GOP"]),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, "Emergency Contact required"),
    relationship: z.enum(["Father", "Brother", "Friend"]),
    phoneNumber: z.string().regex(/^\d+$/, "* Phone number must be a number"),
  }),
});

const updateEmployeeSchema = z.object({
  employeeId: z
    .string()
    .regex(/^\d{3}$/, "* Employee ID must be exactly 3 digits"),
  name: z.string().min(6, "* Full name must be at least 6 characters"),
  email: z
    .string()
    .email("* Invalid email address")
    .min(6, "* Email must be at least 6 characters"),
  dob: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "* Date of Birth must be in YYYY-MM-DD format"
    ),
  phoneNumber: z
    .string()
    .length(11, "* Phone number must be exactly 11 digits")
    .regex(
      /^03\d{9}$/,
      "* Phone number must start with '03' and contain only digits"
    ),
  gender: z.enum(["Male", "Female"]),
  martialStatus: z.enum(["Single", "Married"]),
  address: z.object({
    street: z.string().min(1, "* Street is required"),
    city: z.string().min(1, "* City is required"),
    state: z.string().min(1, "* State is required"),
    postalCode: z.string().min(1, "* Postal Code is required"),
    country: z.string().min(1, "* Country is required"),
  }),

  department: z.string().min(1, "* Department is required"),
  role: z.string().min(1, "* Role is required"),
  salary: z.coerce.number().min(0, "* Salary must be a positive number"),
  shift: z.enum(["Morning", "Evening", "Night"]),
  status: z.enum(["Active", "Inactive", "Leave"]),
  dateOfJoining: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "* Date of Joining must be in YYYY-MM-DD format"
    ),
  employmentType: z.enum(["Full-Time", "Part-Time"]),
  bankDetails: z.object({
    accountNumber: z
      .string()
      .min(8, "* Account number must be at least 8 digits")
      .max(16, "* Account number cannot exceed 16 digits")
      .regex(/^\d+$/, "* Account number must contain only digits"),
    bankName: z.enum(["HBL", "ABL", "GOP"]),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, "* Emergency Contact required"),
    relationship: z.enum(["Father", "Brother", "Friend"]),
    phoneNumber: z.string().regex(/^\d+$/, "* Phone number must be a number"),
  }),
});

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "* Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "* Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "* New password and confirm password must match",
    path: ["confirmPassword"],
  });

const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "* Password must be at least 6 characters"),
    newPassword: z.string().min(6, "* Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "* Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "* New password and confirm password must match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "* New password must be different from old password",
    path: ["newPassword"],
  });

const feedbackSchema = z.object({
  rating: z.enum(["1", "2", "3", "4", "5"], {
    message: "Rating must be between 1 and 5",
  }),
  suggestion: z.string().min(2, "* Suggestion must be at least 2 characters"),
  description: z
    .string()
    .min(10, "* Description must be at least 10 characters"),
});

const complaintSchema = z.object({
  complainType: z
    .string()
    .min(1, "Complaint type is required")
    .refine(
      (val) =>
        [
          "Workplace",
          "Payroll",
          "Harassment",
          "Leave",
          "Scheduling",
          "Misconduct",
        ].includes(val),
      {
        message: "Invalid complaint type",
      }
    ),
  complainSubject: z
    .string()
    .min(3, "* Complaint subject must be at least 3 characters"),
  complaintDetails: z
    .string()
    .min(10, "* Complaint details must be at least 10 characters"),
});

const leaveSchema = z
  .object({
    leaveType: z.string().min(1, "* Leave type is required"),
    duration: z.string().min(1, "* Duration must be at least 1 day"),
    fromDate: z.string().min(1, "* From date is required"),
    toDate: z.string().min(1, "* To date is required"),
    description: z.string().optional(),
  })
  .refine((data) => new Date(data.fromDate) <= new Date(data.toDate), {
    message: "* From date cannot be greater than To date",
    path: ["fromDate"],
  });

export {
  authenticationSchema,
  createEmployeeSchema,
  forgetPasswordSchema,
  updateEmployeeSchema,
  resetPasswordSchema,
  feedbackSchema,
  complaintSchema,
  leaveSchema,
  updatePasswordSchema,
};
