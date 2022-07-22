import { faker } from "@faker-js/faker/locale/en_GH";

export const departmentsArray = [
  "Marketing",
  "Sales",
  "Operations",
  "Finance and Accounting",
  "Technology",
  "Research and Development",
  "Executive Management",
  "Administration",
  "Engineering",
  "Human Resources",
  "Quality Control",
  "Procurement",
  "Customer Service",
];
const jobTitlesArray = [
  "Marketing Specialist",
  "Marketing Manager",
  "Marketing Director",
  "Graphic Designer",
  "Marketing Research Analyst",
  "Marketing Communications Manager",
  "Marketing Consultant",
  "Product Manager",
  "Public Relations",
  "Social Media Assistant",
  "Brand Manager",
  "SEO Manager",
  "Content Marketing Manager",
  "Copywriter",
  "Media Buyer",
  "Digital Marketing Manager",
  "eCommerce Marketing Specialist",
  "Brand Strategist",
  "Vice President of Marketing",
  "Media Relations Coordinator",
  "Administrative Assistant",
  "Receptionist",
  "Office Manager",
  "Auditing Clerk",
  "Bookkeeper",
  "Account Executive",
  "Branch Manager",
  "Business Manager",
  "Quality Control Coordinator",
  "Administrative Manager",
  "Chief Executive Officer",
  "Business Analyst",
  "Risk Manager",
  "Human Resources",
  "Office Assistant",
  "Secretary",
  "Office Clerk",
  "File Clerk",
  "Account Collector",
  "Administrative Specialist",
  "Executive Assistant",
  "Program Administrator",
  "Program Manager",
  "Administrative Analyst",
  "Data Entry",
  "Computer Scientist",
  "IT Professional",
  "UX Designer & UI Developer",
  "SQL Developer",
  "Web Designer",
  "Web Developer",
  "Help Desk Worker/Desktop Support",
  "Software Engineer",
  "Data Entry",
  "DevOps Engineer",
  "Computer Programmer",
  "Network Administrator",
  "Information Security Analyst",
  "Artificial Intelligence Engineer",
  "Cloud Architect",
  "IT Manager",
  "Technical Specialist",
  "Application Developer",
  "Chief Technology Officer (CTO)",
  "Chief Information Officer (CIO)",
];

const leaveTypes = ['Personal Work', 'Casual Leave', 'Sick Leave', 'Maternity Leave']
const leaveStatus = ['pending', 'approved', 'rejected']


const createRandomLeave = () => {
  const leave = {
    leave_type: faker.helpers.arrayElement(leaveTypes),
    leave_status: faker.helpers.arrayElement(leaveStatus),
    leave_from: faker.date.soon(),
    leave_to: faker.date.future(),
  }
  return leave;
}

const genderArray = ["male", "female"];
const maritalStatusArray = ["single", "married"];
function createRandomEmployee() {
  const employee = {
    first_name: faker.fake('{{name.firstName}}'),
    last_name: faker.name.lastName(),
    job_title: faker.helpers.arrayElement(jobTitlesArray),
    address: faker.address.streetAddress(true),
    photo: faker.image.avatar(),
    date_of_birth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
    phone_number: faker.phone.number("+233 ## ### ####"),
    email: faker.fake('{{name.lastName}}@gmail.com').toLowerCase(),
    gender: faker.helpers.arrayElement(genderArray),
    nationality: "Ghanaian",
    marital_status: faker.helpers.arrayElement(maritalStatusArray),
    date_of_hire: faker.date.past(),
  };
  return employee;
}

function createDepartment() {
  const department = {
    name: faker.helpers.arrayElement(departmentsArray),
  };
  return department;
}

export { createDepartment, createRandomEmployee, createRandomLeave };
