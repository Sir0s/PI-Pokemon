import { useState } from "react";

export default function Form(props){
    return(
        <div>
            
            <form onSubmit={""}>
                <h1>Form</h1>
                <label>Pokemon</label><input type="text" placeholder="Poke..." />
                <button>Submit</button>
            </form>
        </div>
    )
}