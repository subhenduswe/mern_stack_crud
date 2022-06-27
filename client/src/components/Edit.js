import React, { useState, useEffect } from 'react'
import { NavLink, useParams,useNavigate } from 'react-router-dom';



const Edit = () => {


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

    const { id } = useParams("");
    console.log(id);

    const getdata = async () => {

        const res = await fetch(`http://192.168.202.160:8003/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {name,email,work,add,mobile,desc,age} = inpval;

        const res2 = await fetch(`http://192.168.202.160:8003/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,email,work,add,mobile,desc,age
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate('/');
        }

    }
    
  return (

    <div className="container">

            <NavLink to="/">home2</NavLink>
            <form className="mt-5">
            <div className="row">
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1">Name</label>
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
                
                <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
            </div>
            </form>
            
        </div>
  )
}

export default Edit