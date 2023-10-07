export interface postData {
  id: string;
  title: string;
  description: string;
  author: string;
  datepPosted: string;
  slug: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}
