

const writePermissionSchemaUser = {
    canCreate: (user)=>{

        if (user.roles.includes('Driver')) {
            // El usuario tiene el rol de Administrador, lo que permite la creación
            return true;
          }//else if (user._id.equals(resource.author)) {
            // El usuario es el autor del recurso, lo que permite la escritura
            //return true;
          //}
        
          return false;
    }


}

export default writePermissionSchemaUser