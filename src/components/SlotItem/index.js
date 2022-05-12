import './index.css'

const SlotItem = props => {
  const {carDetails, returnTicket} = props
  const {registrationNumber, color, slotNumber, id} = carDetails

  const onReturnTicket = () => {
    returnTicket(id)
  }

  return (
    <li className="slot-item">
      <p className="slot-item-description-registration-number">
        {registrationNumber}
      </p>
      <p className="slot-item-description-color">{color}</p>
      <p className="slot-item-description-slot-number">{slotNumber}</p>
      <button
        type="button"
        className="return-ticket-button"
        onClick={onReturnTicket}
      >
        Return Ticket
      </button>
    </li>
  )
}

export default SlotItem
