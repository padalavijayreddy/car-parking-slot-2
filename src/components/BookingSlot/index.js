import './index.css'

const BookingSlot = props => {
  const {
    registrationNumberInput,
    colorInput,
    slotNumberInput,
    changeRegistrationNumberInput,
    changeColorInput,
    changeSlotNumberInput,
    bookASlotErrorMessage,
    submitBookASlotForm,
    colorOptions,
  } = props

  const onSubmitBookASlotForm = event => {
    event.preventDefault()
    submitBookASlotForm()
  }

  const onChangeSlotNumberInput = event => {
    changeSlotNumberInput(event.target.value)
  }

  const renderSlotNumberInputField = () => (
    <div className="book-a-slot-input-field-container">
      <label className="book-a-slot-input-label" htmlFor="slotNumber">
        Slot Number
      </label>
      <input
        type="text"
        className="book-a-slot-input"
        id="slotNumber"
        value={slotNumberInput}
        onChange={onChangeSlotNumberInput}
      />
    </div>
  )

  const onChangeColorInput = event => {
    changeColorInput(event.target.value)
  }

  const renderColorSelectInput = () => (
    <div className="book-a-slot-input-field-container">
      <label className="book-a-slot-input-label" htmlFor="color">
        Color
      </label>
      <select
        className="book-a-slot-input"
        id="color"
        value={colorInput}
        onChange={onChangeColorInput}
      >
        {colorOptions.map(eachOption => (
          <option key={eachOption.optionId} value={eachOption.displayText}>
            {eachOption.displayText}
          </option>
        ))}
      </select>
    </div>
  )

  const onChangeRegistrationNumberInput = event => {
    changeRegistrationNumberInput(event.target.value)
  }

  const renderRegistrationNumberInputField = () => (
    <div className="book-a-slot-input-field-container">
      <label className="book-a-slot-input-label" htmlFor="registrationNumber">
        Registration Number
      </label>
      <input
        type="text"
        className="book-a-slot-input"
        id="registrationNumber"
        placeholder="TO-64-RI-6622"
        value={registrationNumberInput}
        onChange={onChangeRegistrationNumberInput}
      />
    </div>
  )

  return (
    <form className="booking-car-slot-form" onSubmit={onSubmitBookASlotForm}>
      <h1 className="booking-car-slot-form-heading">Book a Car Slot</h1>
      {renderRegistrationNumberInputField()}
      {renderColorSelectInput()}
      {renderSlotNumberInputField()}
      <button type="submit" className="booking-car-slot-form-button">
        Book a Slot
      </button>
      {bookASlotErrorMessage && (
        <p className="error-message">*{bookASlotErrorMessage}</p>
      )}
    </form>
  )
}

export default BookingSlot
