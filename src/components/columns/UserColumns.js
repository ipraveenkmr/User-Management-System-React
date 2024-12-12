
const columns = [
    { field: 'uid', headerName: 'UID', width: 190 },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,
    },
    {
        field: 'loginMethod',
        headerName: 'Login Method',
        width: 250,
        editable: true,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        type: 'string',
        width: 260,
        editable: true,
    }
];

export default columns;