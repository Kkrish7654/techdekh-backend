export interface postData {
  id: number;
  title: string;
  description: string;
  author: string;
  datepPosted: string;
  slug: string;
  thumbnail: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
