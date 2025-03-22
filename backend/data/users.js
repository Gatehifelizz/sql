import bcrypt from 'bcryptjs';

const users = [
    {  
        name:'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {  
        name:'kali',
        email: 'kali@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true,
    },
    {  
        name:'mark',
        email: 'mark@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {  
        name:'wena',
        email: 'wena@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];



export default users;