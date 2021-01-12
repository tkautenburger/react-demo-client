# Limited support of row id. this works on the department resources, if you
# want to CRUD on the employee resources parameter --id empId must be set instead

json-server --watch src/data.json --port 3001 --routes routes.json --id deptId
