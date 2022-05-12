import {Component} from 'react'

import GenerateSlots from '../GenerateSlots'
import SlotsList from '../SlotsList'
import BookingSlot from '../BookingSlot'

import './index.css'

const CAR_COLORS = ['Black', 'White', 'Blue', 'Red']

class CarParkingSlots extends Component {
  state = {
    parkingSlotsInput: '',
    initialCarsParkedInput: '',
    errorMessage: '',
    areSlotsGenerated: false,
    parkedCarsList: [],
    bookingSlot: {
      registrationNumberInput: '',
      colorInput: 'Black',
      slotNumberInput: '',
      errorMessage: '',
    },
  }

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
    const {bookingSlot, parkedCarsList, parkingSlotsInput} = this.state
    const {slotNumberInput} = bookingSlot
    const parsedParkingSlotsInput = parseInt(parkingSlotsInput)
    const parsedSlotNumberInput = parseInt(slotNumberInput)

    if (parsedSlotNumberInput <= parsedParkingSlotsInput) {
      return !parkedCarsList.some(
        eachCarObj => eachCarObj.slotNumber === parsedSlotNumberInput,
      )
    }
    return false
  }

  getNewlyParkedCarObject = () => {
    const {bookingSlot} = this.state
    const {registrationNumberInput, colorInput, slotNumberInput} = bookingSlot
    const slotNumber =
      slotNumberInput && this.isSlotAvailable()
        ? parseInt(slotNumberInput)
        : this.getEmptySlotsNumber()
    const newParkingCar = {
      id: slotNumber,
      registrationNumber: registrationNumberInput,
      color: colorInput,
      slotNumber,
    }

    return newParkingCar
  }

  isSlotFilled = () => {
    const {parkedCarsList, bookingSlot} = this.state
    const {slotNumberInput} = bookingSlot

    if (slotNumberInput) {
      return parkedCarsList.some(
        eachCarObj => eachCarObj.slotNumber === parseInt(slotNumberInput),
      )
    }

    return false
  }

  isCarAlreadyPresent = () => {
    const {parkedCarsList, bookingSlot} = this.state
    const {registrationNumberInput} = bookingSlot
    const carIndex = parkedCarsList.findIndex(
      car => car.registrationNumber === registrationNumberInput,
    )

    return carIndex !== -1
  }

  validateAndBookSlot = () => {
    const {parkingSlotsInput, parkedCarsList, bookingSlot} = this.state
    const {slotNumberInput} = bookingSlot
    const filledSlotsCount = parkedCarsList.length
    const parsedParkingSlotsInput = parseInt(parkingSlotsInput)
    const parsedSlotNumberInput = parseInt(slotNumberInput)

    if (this.isCarAlreadyPresent()) {
      this.setState({
        bookingSlot: {
          ...bookingSlot,
          errorMessage: 'Car is already in parking slot',
        },
      })
    } else if (
      (slotNumberInput !== '' && parsedSlotNumberInput <= 0) ||
      parsedSlotNumberInput > parsedParkingSlotsInput
    ) {
      this.setState({
        bookingSlot: {...bookingSlot, errorMessage: 'Invalid slot number'},
      })
    } else if (parsedParkingSlotsInput <= filledSlotsCount) {
      this.setState({
        bookingSlot: {...bookingSlot, errorMessage: 'No slots available'},
      })
    } else if (this.isSlotFilled()) {
      this.setState({
        bookingSlot: {...bookingSlot, errorMessage: 'Slot is not empty'},
      })
    } else {
      const newParkedCarsList = [
        ...parkedCarsList,
        this.getNewlyParkedCarObject(),
      ]
      const sortedParkedCarsList = newParkedCarsList.sort(
        (carObj1, carObj2) => carObj1.slotNumber - carObj2.slotNumber,
      )

      this.setState({
        parkedCarsList: sortedParkedCarsList,
        bookingSlot: {
          registrationNumberInput: '',
          colorInput: 'Black',
          slotNumberInput: '',
          errorMessage: '',
        },
      })
    }
  }

  bookASlot = () => {
    const {bookingSlot} = this.state
    const {registrationNumberInput} = bookingSlot

    if (registrationNumberInput) {
      this.validateAndBookSlot()
    } else {
      this.setState({
        bookingSlot: {
          ...bookingSlot,
          errorMessage: 'Registration number is required',
        },
      })
    }
  }

  changeBookingRegistrationNumberInput = regNum => {
    const {bookingSlot} = this.state

    this.setState({
      bookingSlot: {...bookingSlot, registrationNumberInput: regNum},
    })
  }

  changeBookingColorInput = color => {
    const {bookingSlot} = this.state

    this.setState({
      bookingSlot: {...bookingSlot, colorInput: color},
    })
  }

  changeBookingSlotNumberInput = num => {
    const {bookingSlot} = this.state

    this.setState({
      bookingSlot: {...bookingSlot, slotNumberInput: num},
    })
  }

  returnTicket = id => {
    const {parkedCarsList} = this.state
    const updatedParkingSlots = [...parkedCarsList]

    const parkingSlotIndex = updatedParkingSlots.findIndex(
      parkedCar => parkedCar.id === id,
    )
    updatedParkingSlots.splice(parkingSlotIndex, 1)
    this.setState({parkedCarsList: updatedParkingSlots})
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

  generateParkedCarObject = carId => {
    const carObject = {
      id: carId,
      registrationNumber: this.generateRandomRegistrationNumber(),
      color: CAR_COLORS[Math.floor(Math.random() * 4)],
      slotNumber: carId,
    }

    return carObject
  }

  generateParkingSlots = () => {
    const {initialCarsParkedInput} = this.state
    const carsList = []

    for (let i = 1; i <= initialCarsParkedInput; i += 1) {
      carsList.push(this.generateParkedCarObject(i))
    }

    this.setState({
      parkedCarsList: carsList,
      areSlotsGenerated: true,
      errorMessage: '',
    })
  }

  validateAndGenerateSlots = () => {
    const {parkingSlotsInput, initialCarsParkedInput} = this.state
    const parsedParkingSlotsInput = parseInt(parkingSlotsInput)
    const parsedInitialCarsParkedInput = parseInt(initialCarsParkedInput)

    if (
      parsedParkingSlotsInput === 0 ||
      parkingSlotsInput === '' ||
      Number.isNaN(parsedParkingSlotsInput)
    ) {
      this.setState({errorMessage: 'Invalid parking slots'})
    } else if (
      parsedParkingSlotsInput < 0 ||
      parsedInitialCarsParkedInput < 0
    ) {
      this.setState({
        errorMessage: 'Parking Slots and Cars should not be less than 0',
      })
    } else if (parsedParkingSlotsInput < parsedInitialCarsParkedInput) {
      this.setState({
        errorMessage: 'Cars should not greater than Parking Slots',
      })
    } else {
      this.generateParkingSlots()
    }
  }

  changeInitialCarsParkedInput = num => {
    this.setState({initialCarsParkedInput: num})
  }

  changeParkingSlotsInput = num => {
    this.setState({parkingSlotsInput: num})
  }

  render() {
    const {
      areSlotsGenerated,
      parkingSlotsInput,
      initialCarsParkedInput,
      errorMessage,
      bookingSlot,
      parkedCarsList,
    } = this.state
    const {registrationNumberInput, colorInput, slotNumberInput} = bookingSlot

    return (
      <>
        {!areSlotsGenerated ? (
          <GenerateSlots
            parkingSlotsInput={parkingSlotsInput}
            initialCarsParkedInput={initialCarsParkedInput}
            changeParkingSlotsInput={this.changeParkingSlotsInput}
            changeInitialCarsParkedInput={this.changeInitialCarsParkedInput}
            errorMessage={errorMessage}
            generateSlots={this.validateAndGenerateSlots}
          />
        ) : (
          <div className="booking-car-slot-view-container">
            <h1 className="booking-car-slot-view-heading">Car Parking Slots</h1>
            <div className="booking-car-slot-container">
              <SlotsList
                parkingSlotsInput={parkingSlotsInput}
                parkedCarsList={parkedCarsList}
                returnTicket={this.returnTicket}
              />

              <BookingSlot
                registrationNumberInput={registrationNumberInput}
                colorInput={colorInput}
                slotNumberInput={slotNumberInput}
                changeBookingRegistrationNumberInput={
                  this.changeBookingRegistrationNumberInput
                }
                changeBookingColorInput={this.changeBookingColorInput}
                changeBookingSlotNumberInput={this.changeBookingSlotNumberInput}
                bookingDetails={bookingSlot}
                bookASlot={this.bookASlot}
                errorMessage={bookingSlot.errorMessage}
                carColors={CAR_COLORS}
              />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default CarParkingSlots
