import './index.css'

const GenerateSlots = props => {
  const {
    parkingSlotsInput,
    initialCarsParkedInput,
    changeParkingSlotsInput,
    changeInitialCarsParkedInput,
    errorMessage,
    generateSlots,
  } = props

  const onSubmitForm = event => {
    event.preventDefault()

    generateSlots()
  }

  const onChangeInitialCarsParkedInput = event => {
    const {target} = event
    const {value} = target

    changeInitialCarsParkedInput(value)
  }

  const renderInitialCarsParkedInputField = () => (
    <div className="input-field-container">
      <label className="input-label" htmlFor="cars">
        Cars
      </label>
      <input
        type="text"
        className="input"
        id="cars"
        value={initialCarsParkedInput}
        onChange={onChangeInitialCarsParkedInput}
      />
    </div>
  )

  const onChangeParkingSlotsInput = event => {
    const {target} = event
    const {value} = target

    changeParkingSlotsInput(value)
  }

  const renderParkingSlotsInputField = () => (
    <div className="input-field-container">
      <label className="input-label" htmlFor="parkingSlots">
        Parking Slots
      </label>
      <input
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
      <form className="generate-slots-form">
        <h1 className="generate-slots-form-heading">Car Parking Slots</h1>
        {renderParkingSlotsInputField()}
        {renderInitialCarsParkedInputField()}
        <button
          type="submit"
          className="generate-slots-form-button"
          onClick={onSubmitForm}
        >
          Generate Slots
        </button>
        {errorMessage && <p className="error-message">*{errorMessage}</p>}
      </form>
    </div>
  )
}

export default GenerateSlots
