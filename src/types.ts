export interface Classroom {
  class_id: string;
  grade: number;
  class?: number;
  section: string;
}

export interface Term {
  term_id: string;
  index: number;
}

export interface StudentInfo {
  std_id: string;
  full_name: string;
  email: string;
  grade: number;
  class_id: string;
  current_class: Classroom;
  portrait: string;
}

export interface AppData {
  student_info: StudentInfo;
  terms: Term[];
  attendedClasses: Classroom[];
}