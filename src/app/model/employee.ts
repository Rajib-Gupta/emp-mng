
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

  export interface kpiHistory extends Admin{
    id?:string,
    givenby_id?:string,
    session:number,
    year:number,
    super_kpi:number,
    emp_kpi:number,
    total_kpi:number,
    to_emp?:string,
    from_emp?:string,
    sup_kpi_details?:any,
    emp_kpi_details?:any
  }
  

  export interface kpiDetails{
        id?: string
        emp_id?: string
        supervisor_id?:string
        givenby_id?:string
        kpi_session?:any;
        session?:any;
        kpi_details?:any;
          availability:number,
          ontime:number,
          punctuality:number,
          regularity:number,
          timetorepair:number,
          criticalproblemsolving:9,
          clienthandling:number,
          innovative:number,
          teamPlayer:number,
          dependibility:number
        
       
        kpiSessionId?: string

  }
export interface Detail {
    status: string;
    roll: number;
  }
  export interface Employee {
    id?:string;
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
    desig:string;
    image?:string;
    supervisor_id?:string;
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

export interface passwordReset{
  password:string;
  newPassword:string
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
export interface Session{
  id?:string,
  session:any,
  year:number,
  is_active?:number,
  is_completed?:number

}

export interface session_details extends Session{
  session:{
    session:number
  }
}
export interface UpdateSession{
  is_completed:number
}
export interface addKpi{
 
  supervisor_id?:string;
  givenby_id:string,
  kpiSessionId:string
  kpi_details:{
    availability: number,
    ontime: number,
    punctuality: number,
    regularity: number,
    timetorepair: number,
    criticalproblemsolving: number,
    clienthandling: number,
    innovative: number,
    teamPlayer: number,
    dependibility: number,
  }
  
  

}