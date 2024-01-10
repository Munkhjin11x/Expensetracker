import Vector from "../../public/img/Vector.png"
import avatar from "../../public/img/PLaceholder.png"
export default function Navbar(params) {
    
    return (
        <nav className="flex justify-between  items-center box-border py-[16px]">
            <div className="flex gap-6 justify-center items-center">
            <img src={Vector.src}/>
            <p className=" text-[16px] font-semibold">Dashboard</p>
            <p>Records</p>
            </div>
            <div className="flex justify-center items-center gap-6">
                <p className=" h-8  px-3 bg-blue-600 text-white w-[75px] rounded-[20px] flex items-center justify-center">+Record</p>
                <img src={avatar.src}/>
            </div>
        </nav>
    )
    
}