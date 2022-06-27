import React, { useState} from 'react'
import { NavLink,  useNavigate } from 'react-router-dom'

const Register = () => {
       

    const navigate = useNavigate();

       const [inpval,setINP] = useState({
           name:"",
           email:"",
           age:"",
           mobile:"",
           work:"",
           add:"",
           desc:""
       }

       )

       const setdata = (e)=>{

        console.log(e.target.value);
        const {name,value} = e.target;
        setINP((preval) => {
          
            return {
                ...preval,
                [name]:value
            }
        })
       }


       const addinpdata = async(e)=>{
        e.preventDefault();

        const { name, email, work, add, mobile, desc, age } = inpval;

        const res = await fetch("http://192.168.202.160:8003/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, work, add, mobile, desc, age
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } 
        else {

             alert("data added");
             navigate('/');
             console.log("data added");

         }
    }       




    return (
        <div className="container">

            <NavLink to="/">home</NavLink>
            <form className="mt-5">
            <div className="row">
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1">Nmae</label>
                    <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control"/>
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1">email</label>
                    <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control"/>
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1">age</label>
                    <input type="text"  value={inpval.age} onChange={setdata} name="age" class="form-control"/>
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1">Mobile</label>
                    <input type="number"  value={inpval.mobile} onChange={setdata} name="mobile" class="form-control"/>
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1">Work</label>
                    <input type="text"   value={inpval.work} onChange={setdata} name="work" class="form-control"/>
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1">Address</label>
                    <input type="text" value={inpval.add}  onChange={setdata} name="add"  class="form-control"/>
                </div>
                <div class="mb-3 col-lg-12 col-md-12 col-12">
                    <label for="exampleInputPassword1">Description</label>
                    <textarea value={inpval.desc} onChange={setdata} name="desc"  className="form-control" ></textarea>
                </div>
                
                <button type="submit"  onClick={addinpdata} class="btn btn-primary">Submit</button>
            </div>
            </form>
            
        </div>
    )
}

export default Register