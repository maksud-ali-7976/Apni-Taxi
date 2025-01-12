import AutoAddress from "./AutoAddress"
import Car from "./Car"
import Payment from "./Payment"


const Booking = () => {
  return (
    <div className="p-5">
      <h2 className="text-[25px] font-semibold">Booking</h2>
      <div className=" mt-1 border-[2px] p-2 rounded-md h-full overflow-hidden">
        <AutoAddress />
        <Car />
        <Payment />
      </div>
    </div>
  )
}

export default Booking