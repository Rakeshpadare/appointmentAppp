
function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    const obj = {
        name,
        email,
        phonenumber
        
        
    }
    // for network call
    axios.post("https://crudcrud.com/api/c3f63b332fdf4550b1da21da267b16b0/Data",obj)
        .then((responce)=>{
            showNewUserOnScreen(responce.data)
            console.log(responce)
        })
        .catch((err)=>{
            console.error(err)
        })
    
        
    
    // localStorage.setItem(obj.email, JSON.stringify(obj))
    // localStorage.getItem(obj.email, JSON.stringify(obj))
    showNewUserOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/c3f63b332fdf4550b1da21da267b16b0')
        .then((responce)=>{
            console.log(responce)

            for(var i=0; i<responce.data.length;i++){
                showNewUserOnScreen(responce.data[i])
            }
        })
        .catch((err)=>{
            console.error(err)
        })
    // const localStorageObj = localStorage;
    // const localstoragekeys  = Object.keys(localStorageObj)

    // for(var i =0; i< localstoragekeys.length; i++){
    //     const key = localstoragekeys[i]
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     showNewUserOnScreen(userDetailsObj)
    // }
})

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
    // console.log(localStorage.getItem(user.emailId))
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user.email}')> Delete User </button>
                            <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}')>Edit User </button>
                            </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(emailId, name, phonenumber){

    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;

    deleteUser(emailId)
    }

// deleteUser('abc@gmail.com')

function deleteUser(emailId){
    console.log(emailId)
    localStorage.removeItem(emailId);
    removeUserFromScreen(emailId);

}

function removeUserFromScreen(emailId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}








