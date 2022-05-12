import SlotItem from '../SlotItem'

import './index.css'

const SlotsList = props => {
  const {parkedCarsList, returnTicket} = props

  return (
    <div className="slots-list-container">
      <ul className="slots-list" testid="slotsList">
        <li className="list-item-header">
          <p className="list-item-heading registration-number">
            Registration Number
          </p>
          <p className="list-item-heading color">Color</p>
          <p className="list-item-heading slot-number">Slot Number</p>
          <p className="list-item-heading return-ticket" />
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
