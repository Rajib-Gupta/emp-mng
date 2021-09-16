
export interface Admin {
    emp_id: string;
    f_name: string;
    l_name: string;
    email: string;
    phone: number;
    status: string;
    sup_id: number;
    roll: number;
  }
  
export interface Detail {
    status: string;
    roll: number;
  }
  export interface Employee {
    emp_id: string;
    f_name: string;
    l_name: string;
    phone: number;
    email: string;
    password: string;
    role: string;
    status: string;
    dob:Date;
    doj:Date;
    dpt:string;
    desig:string
  
    details?: Detail[];
  }
  export interface EmployeeUpdate extends Employee{
    id:any;
   
  }
export interface AuthResponce {
  email: string;
  password: string;
  role: number;
  sup_id: number;
  token: string;
}

export interface EmpResponce {
  emp_email: string;
  emp_password: string;
  token: string;
}

export interface LogInResponce {
  email: string;
  password: string;
  role: number;
  token: string;
}
export interface Supervisor extends Employee {
  id:string,
  supervisor_id:string,
  supervisor_name: string;
}
export interface Count extends Employee{
  count:number
}