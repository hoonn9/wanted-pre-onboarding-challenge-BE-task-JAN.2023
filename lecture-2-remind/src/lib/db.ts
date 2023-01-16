import { v4 } from 'uuid';

export type Member = {
  id: string;
  email: string;
  password: string;
};

export const MemoryDatabase = (() => {
  const members: Member[] = [
    {
      id: v4(),
      email: 'hoon@email.com',
      password: 'password',
    },
  ];

  return {
    member: {
      findAll: () => members,
    },
  };
})();

export const H2Database = (() => {
  const members: Member[] = [
    {
      id: v4(),
      email: 'admin@email.com',
      password: 'adminpassword',
    },
  ];

  return {
    member: {
      findAll: () => members,
    },
  };
})();
