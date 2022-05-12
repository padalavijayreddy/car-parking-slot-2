import './index.css'

const GenerateSlots = props => {
  const {
    parkingSlotsInput,
    carsInput,
    changeParkingSlotsInput,
    changeCarsInput,
    generateSlotsErrorMessage,
    submitGenerateSlotsForm,
  } = props

  const onSubmitGenerateSlotsForm = event => {
    event.preventDefault()
    submitGenerateSlotsForm()
  }

  const onChangeCarsInput = event => {
    changeCarsInput(event.target.value)
  }

  const renderCarsInputField = () => (
    <div className="input-field-container">
      <label className="input-label" htmlFor="cars">
        Cars
      </label>
      <input
        autoComplete="off"
        type="text"
        className="input"
        id="cars"
        value={carsInput}
        onChange={onChangeCarsInput}
      />
    </div>
  )

  const onChangeParkingSlotsInput = event => {
    changeParkingSlotsInput(event.target.value)
  }

  const renderParkingSlotsInputField = () => (
    <div className="input-field-container">
      <label className="input-label" htmlFor="parkingSlots">
        Parking Slots
      </label>
      <input
        autoComplete="off"
        type="text"
        className="input"
        id="parkingSlots"
        value={parkingSlotsInput}
        onChange={onChangeParkingSlotsInput}
      />
    </div>
  )

  return (
    <div className="generate-slots-view-container">
      <img
        className="generate-slots-img"
        src="https://res.cloudinary.com/dbc9s4sim/image/upload/q_auto:best/v1650345842/Car%20Parking%20Slots/unsplash_aLRzYepldy0_uvbz5e.png"
        alt="car parking slots"
      />
      <form
        className="generate-slots-form"
        onSubmit={onSubmitGenerateSlotsForm}
      >
        <h1 className="generate-slots-form-heading">Car Parking Slots</h1>
        {renderParkingSlotsInputField()}
        {renderCarsInputField()}
        <button type="submit" className="generate-slots-form-button">
          Generate Slots
        </button>
        {generateSlotsErrorMessage && (
          <p className="error-message">*{generateSlotsErrorMessage}</p>
        )}
      </form>
    </div>
  )
}

export default GenerateSlots
