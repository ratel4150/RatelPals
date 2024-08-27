import models  from "../models/index.js";
const {Role}=models

export const createRoles = async () => {
    const rolesData = [
      {
        name: "Driver",
        description: "Driver",
        permissions: ["accessDashboard"],
        status: "Active",
        createdAt: new Date(),
      },
      {
        name: "Passenger",
        description: "Usuario que utiliza la aplicación para solicitar y pagar por servicios de transporte.",
        permissions: ["accessDashboard"],
        status: "Active",
        createdAt: new Date(),
      },
    ];
  
    const createdRoles = [];
  
    for (const roleData of rolesData) {
      const role = new Role(roleData);
      const savedRole = await role.save();
      createdRoles.push(savedRole);
    }
  
    console.log("Roles creados:", createdRoles);
    return createdRoles;
  };