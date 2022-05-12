import './index.css'

const BookingSlot = props => {
  const {
    registrationNumberInput,
    colorInput,
    slotNumberInput,
    errorMessage,
    changeBookingRegistrationNumberInput,
    changeBookingColorInput,
    changeBookingSlotNumberInput,
    bookASlot,
    carColors,
  } = props

  const onClickBookASlot = event => {
    event.preventDefault()

    bookASlot()
  }

  const onChangeSlotNumberInput = event => {
    const {value} = event.target

    changeBookingSlotNumberInput(value)
  }

  const renderSlotNumberInputField = () => (
    <div className="input-field-container">
      <label className="input-label" htmlFor="slotNumber">
        Slot Number
      </label>
      <input
        type="text"
        className="input"
        id="slotNumber"
        value={slotNumberInput}
        onChange={onChangeSlotNumberInput}
      />
    </div>
  )

  const onChangeColorInput = event => {
    const {value} = event.target

    changeBookingColorInput(value)
  }

  const renderColorSelectInput = () => (
    <div className="input-field-container">
      <label className="input-label" htmlFor="color">
        Color
      </label>
      <select
        className="input"
        id="color"
        onChange={onChangeColorInput}
        value={colorInput}
      >
        <option value={carColors[0]}>{carColors[0]}</option>
        <option value={carColors[1]}>{carColors[1]}</option>
        <option value={carColors[2]}>{carColors[2]}</option>
        <option value={carColors[3]}>{carColors[3]}</option>
      </select>
    </div>
  )

  const onChangeRegistrationNumberInput = event => {
    const {value} = event.target

    changeBookingRegistrationNumberInput(value)
  }

  const renderRegistrationNumberInputField = () => (
    <div className="input-field-container">
      <label className="input-label" htmlFor="registrationNumber">
        Registration Number
      </label>
      <input
        type="text"
        className="input"
        id="registrationNumber"
        placeholder="TO-64-RI-6622"
        value={registrationNumberInput}
        onChange={onChangeRegistrationNumberInput}
      />
    </div>
  )

  return (
    <form className="booking-car-slot-form">
      <h1 className="booking-car-slot-form-heading">Book a Car Slot</h1>
      {renderRegistrationNumberInputField()}
      {renderColorSelectInput()}
      {renderSlotNumberInputField()}
      <button
        type="submit"
        className="booking-car-slot-form-button"
        onClick={onClickBookASlot}
      >
        Book a Slot
      </button>
      {errorMessage && <p className="error-message">*{errorMessage}</p>}
    </form>
  )
}

export default BookingSlot
