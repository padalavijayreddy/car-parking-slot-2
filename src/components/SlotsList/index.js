import SlotItem from '../SlotItem'

import './index.css'

const SlotsList = props => {
  const {parkedCarsList, returnTicket, parkingSlotsInput} = props
  const parsedParkingSlotsInput = parseInt(parkingSlotsInput)

  return (
    <div className="slots-list-container">
      <h1 className="slots-list-heading">
        Total Slots: {parsedParkingSlotsInput}
      </h1>
      <ul className="slots-list" testid="slotsList">
        <li className="list-item-header">
          <p className="list-item-heading registration-number">
            Registration Number
          </p>
          <p className="list-item-heading color">Color</p>
          <p className="list-item-heading slot-number">Slot Number</p>
        </li>
        {parkedCarsList.map(eachCar => (
          <SlotItem
            key={eachCar.id}
            carDetails={eachCar}
            returnTicket={returnTicket}
          />
        ))}
      </ul>
    </div>
  )
}

export default SlotsList
