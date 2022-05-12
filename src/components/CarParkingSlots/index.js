import {Component} from 'react'
import {v4} from 'uuid'

import GenerateSlots from '../GenerateSlots'
import SlotsList from '../SlotsList'
import BookingSlot from '../BookingSlot'

import './index.css'

const colorOptions = [
  {
    optionId: 'BLACK',
    displayText: 'Black',
  },
  {
    optionId: 'WHITE',
    displayText: 'White',
  },
  {
    optionId: 'BLUE',
    displayText: 'Blue',
  },
  {
    optionId: 'RED',
    displayText: 'Red',
  },
]

class CarParkingSlots extends Component {
  state = {
    parkingSlotsInput: '',
    carsInput: '',
    generateSlotsErrorMessage: '',
    isBookASlotView: false,
    registrationNumberInput: '',
    colorInput: 'Black',
    slotNumberInput: '',
    bookASlotErrorMessage: '',
    parkedCarsList: [],
  }

  // #region - checked functions

  getEmptySlotsNumber = () => {
    const {parkedCarsList} = this.state
    const slotIndex = parkedCarsList.findIndex(
      (eachCarObj, index) => eachCarObj.slotNumber !== index + 1,
    )

    if (slotIndex !== -1) {
      for (let index = 0; index < parkedCarsList.length; index += 1) {
        if (parseInt(parkedCarsList[index].slotNumber) !== index + 1) {
          return index + 1
        }
      }
    }

    return parkedCarsList.length + 1
  }

  isSlotAvailable = () => {
    const {parkedCarsList, parkingSlotsInput, slotNumberInput} = this.state
    const parsedParkingSlotsInput = parseInt(parkingSlotsInput)
    const parsedSlotNumberInput = parseInt(slotNumberInput)

    if (parsedSlotNumberInput <= parsedParkingSlotsInput) {
      return !parkedCarsList.some(
        eachCarObj => eachCarObj.slotNumber === parsedSlotNumberInput,
      )
    }
    return false
  }

  isSlotFilled = () => {
    const {parkedCarsList, slotNumberInput} = this.state

    if (slotNumberInput) {
      return parkedCarsList.some(
        eachCarObj => eachCarObj.slotNumber === parseInt(slotNumberInput),
      )
    }

    return false
  }

  validateAndBookASlot = () => {
    const {
      parkingSlotsInput,
      parkedCarsList,
      registrationNumberInput,
      colorInput,
      slotNumberInput,
    } = this.state
    const filledSlotsCount = parkedCarsList.length
    const parsedParkingSlotsInput = parseInt(parkingSlotsInput)
    const parsedSlotNumberInput = parseInt(slotNumberInput)
    const carObject = parkedCarsList.find(
      eachCarItem => eachCarItem.registrationNumber === registrationNumberInput,
    )
    const slotNumber =
      slotNumberInput && this.isSlotAvailable()
        ? parsedSlotNumberInput
        : this.getEmptySlotsNumber()

    const newParkingCar = {
      id: v4(),
      registrationNumber: registrationNumberInput,
      color: colorInput,
      slotNumber,
    }

    if (carObject) {
      this.setState({
        bookASlotErrorMessage: 'Car is already in parking slot',
      })
    } else if (
      (slotNumberInput !== '' && parsedSlotNumberInput <= 0) ||
      parsedSlotNumberInput > parsedParkingSlotsInput
    ) {
      this.setState({
        bookASlotErrorMessage: 'Invalid slot number',
      })
    } else if (parsedParkingSlotsInput <= filledSlotsCount) {
      this.setState({bookASlotErrorMessage: 'No slots available'})
    } else if (this.isSlotFilled()) {
      this.setState({
        bookASlotErrorMessage: 'Slot is not empty',
      })
    } else {
      const updatedParkedCarsList = [...parkedCarsList, newParkingCar]
      const sortedParkedCarsList = updatedParkedCarsList.sort(
        (carObj1, carObj2) => carObj1.slotNumber - carObj2.slotNumber,
      )

      this.setState({
        parkedCarsList: sortedParkedCarsList,
        registrationNumberInput: '',
        colorInput: 'Black',
        slotNumberInput: '',
        bookASlotErrorMessage: '',
      })
    }
  }

  submitBookASlotForm = () => {
    const {registrationNumberInput} = this.state

    if (registrationNumberInput) {
      this.validateAndBookASlot()
    } else {
      this.setState({
        bookASlotErrorMessage: 'Registration number is required',
      })
    }
  }

  changeSlotNumberInput = slotNumber => {
    this.setState({slotNumberInput: slotNumber})
  }

  changeColorInput = color => {
    this.setState({colorInput: color})
  }

  changeRegistrationNumberInput = registrationNumber => {
    this.setState({registrationNumberInput: registrationNumber})
  }

  returnTicket = id => {
    const {parkedCarsList} = this.state
    const updatedParkedCarsList = parkedCarsList.filter(
      eachCarParkedItem => eachCarParkedItem.id !== id,
    )
    this.setState({parkedCarsList: updatedParkedCarsList})
  }

  generateRandomColor = () => {
    const option = colorOptions[Math.floor(Math.random() * 4)]
    return option.displayText
  }

  randomNumbersGenerator = () => {
    let result = ''
    const numbers = '0123456789'
    result =
      numbers[Math.floor(Math.random() * 10)] +
      numbers[Math.floor(Math.random() * 10)]

    return result
  }

  randomAlphabetsGenerator = () => {
    let result = ''
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    result =
      alphabets[Math.floor(Math.random() * 26)] +
      alphabets[Math.floor(Math.random() * 26)]
    return result
  }

  generateRandomRegistrationNumber = () => {
    const result = `${this.randomAlphabetsGenerator()}-${this.randomNumbersGenerator()}-${this.randomAlphabetsGenerator()}-${this.randomNumbersGenerator()}${this.randomNumbersGenerator()}`
    return result
  }

  generateSlots = () => {
    const {carsInput} = this.state
    const carsList = []

    for (let i = 1; i <= carsInput; i += 1) {
      const carObject = {
        id: v4(),
        registrationNumber: this.generateRandomRegistrationNumber(),
        color: this.generateRandomColor(),
        slotNumber: i,
      }
      carsList.push(carObject)
    }

    this.setState({
      parkedCarsList: carsList,
      isBookASlotView: true,
      generateSlotsErrorMessage: '',
    })
  }

  submitGenerateSlotsForm = () => {
    const {parkingSlotsInput, carsInput} = this.state
    const parsedParkingSlotsInput = parseInt(parkingSlotsInput)
    const parsedCarsInput = parseInt(carsInput)

    if (parsedParkingSlotsInput === 0 || parkingSlotsInput === '') {
      this.setState({generateSlotsErrorMessage: 'Invalid parking slots'})
    } else if (parsedParkingSlotsInput < 0 || parsedCarsInput < 0) {
      this.setState({
        generateSlotsErrorMessage:
          'Parking Slots and Cars cannot be less than 0',
      })
    } else if (parsedParkingSlotsInput < parsedCarsInput) {
      this.setState({generateSlotsErrorMessage: 'Cannot generate slots'})
    } else {
      this.generateSlots()
    }
  }

  changeCarsInput = carsNumber => {
    this.setState({carsInput: carsNumber})
  }

  changeParkingSlotsInput = parkingSlotsNumber => {
    this.setState({parkingSlotsInput: parkingSlotsNumber})
  }

  // #endregion

  render() {
    const {
      isBookASlotView,
      parkingSlotsInput,
      carsInput,
      generateSlotsErrorMessage,
      registrationNumberInput,
      colorInput,
      slotNumberInput,
      bookASlotErrorMessage,
      parkedCarsList,
    } = this.state
    const parsedParkingSlotsInput = parseInt(parkingSlotsInput)

    return (
      <>
        {!isBookASlotView ? (
          <GenerateSlots
            parkingSlotsInput={parkingSlotsInput}
            carsInput={carsInput}
            changeParkingSlotsInput={this.changeParkingSlotsInput}
            changeCarsInput={this.changeCarsInput}
            generateSlotsErrorMessage={generateSlotsErrorMessage}
            submitGenerateSlotsForm={this.submitGenerateSlotsForm}
          />
        ) : (
          <div className="booking-car-slot-view-container">
            <h1 className="booking-car-slot-view-heading">Car Parking Slots</h1>
            <h1 className="slots-list-heading">
              Total Slots: {parsedParkingSlotsInput}
            </h1>
            <div className="booking-car-slot-container">
              <SlotsList
                parkedCarsList={parkedCarsList}
                returnTicket={this.returnTicket}
              />
              <BookingSlot
                registrationNumberInput={registrationNumberInput}
                colorInput={colorInput}
                slotNumberInput={slotNumberInput}
                changeRegistrationNumberInput={
                  this.changeRegistrationNumberInput
                }
                changeColorInput={this.changeColorInput}
                changeSlotNumberInput={this.changeSlotNumberInput}
                bookASlotErrorMessage={bookASlotErrorMessage}
                submitBookASlotForm={this.submitBookASlotForm}
                colorOptions={colorOptions}
              />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default CarParkingSlots
