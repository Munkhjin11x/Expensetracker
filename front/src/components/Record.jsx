import house from  "../../public/img/House.png"
export default function RecordTab() {
    return(
        <div className="w-[1152px] flex justify-between items-center">
            <div className="flex gap-3">
                <div className="bg-blue-600  w-[40px] h-[40px] flex justify-center items-center rounded-[20px]">
            <img className="w-[20px] h-[20px] " src={house.src}/>

                </div>
            <div>
            <p>Lending</p>
            <p>3hours ago</p>
            </div>     
            </div>
            <div>
                <p>-1000</p>
            </div>
        </div>
    )
    
}