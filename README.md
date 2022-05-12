### Project Description

In this project, you are going to build a **Monthly Emojis** Application.

### User stories

<br/>
<div style="text-align: center;">
    <img src="https://res.cloudinary.com/dbc9s4sim/image/upload/q_auto:best/v1650726579/Car%20Parking%20Slots/localhost_3000__t5yzqi.png" alt="monthly emojis output" style="max-width:70%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

1. Users using this application should be able to see the **Car Parking Slots** view, which consists of total number of **Parking Slots**, number of **Cars** available for parking and **Generate Slots** button
2. Users should be able to generate the slots,
    1. If the **Generate Slots** button is clicked with an empty or `0` value **Parking Slots** is provided, then the error message with the text content as **Invalid parking slots** should be displayed
    2. If the **Parking Slots** or **Cars** value is less than `0` and the **Generate Slots** button is clicked, then the error message with the text content as **Parking Slots and Cars should not be less than 0** should be displayed
    3. If the number of **Cars** available for parking value is greater than total number of **Parking Slots** and the **Generate Slots** button is clicked, then the error message with the text content as **Cars should not greater than Parking Slots** should be displayed
    4. If the valid values are provided and **Generate Slots** button is clicked, then the user should be able to see the **Book a Car Slot** view

<br/>
<div style="text-align: center;">
    <img src="https://res.cloudinary.com/dbc9s4sim/image/upload/q_auto:best/v1650726588/Car%20Parking%20Slots/localhost_3000__1_rmopsp.png" alt="monthly emojis output" style="max-width:70%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

3. Users should be able to see the car parking slots list
    1. The number can be divided into four parts separated by a hyphen (-)
    
        | Two Alphabets | Two Numbers | Two Alphabets | Four Numbers |
        | :-----------: | :---------: | :-----------: | :----------: |
        |      WJ       |     95      |      OB       |     8356     |

    2. Here the number will be **WJ-95-OB-8356**.
    3. The possible colors are `['Black', 'White', 'Blue', 'Red']`
    4. 
4. Users should be able to see the **Car Parking Slots** view, which consists of total number of **Parking Slots**, number of **Cars** available for parking and **Generate Slots** button

### Completion Instructions

<details>
<summary>Functionality to be added</summary>
<br/>

The app must have the following functionalities

- Car parking slots view,

  - When the "Parking Slots" input field is provided with `0` or no input, then display an error message with the text as **\*Invalid parking slots**.
  - When the negative inputs are provided for any of the input fields, then display an error message with the text as **\*Inputs cannot be less than 0**.
  - When "Cars" is provided with greater value than the "Parking slots", then display an error message with the text as **\*Cannot generate slots**.
  - When proper inputs are provided and the **Generate** button is clicked, then slots should be generated with random Registration numbers and Colors with corresponding Slot numbers.

  <MultiLineNote>

  - The possible colors are `['Black', 'White', 'Blue', 'Red']`
  - **Registration Number Format**

    - The number can be divided into four parts separated by a hyphen (-)

    | Two Alphabets | Two Numbers | Two Alphabets | Four Numbers |
    | :-----------: | :---------: | :-----------: | :----------: |
    |      WJ       |     95      |      OB       |     8356     |

    - Here the number will be **WJ-95-OB-8356**.

  </MultiLineNote>

- Booking car slot view

  - When the **Return Ticket** button is clicked, then the respective car should be removed from the list.
  - When a Registration number is not provided, then display an error message with the text as **\*Registration number is required**.
  - When a Registration number is provided which is already in the list, then display an error message with the text as **\*Car is already in parking slot**.
  - When an existing slot number is provided as an input, then display an error message with the text as **\*Slot is not empty**.
  - When a `0` or negative integer or a greater slot number than the available parking slots is provided as an input, then display an error message with the text as **\*Invalid slot number**.
  - When trying to book a slot when all the slots are full, then display an error message with the text as **\*No slots available**.
  - **Allocating the slots**
    - When no slot number is provided, then the first empty slot in the ascending order should be allocated.

</details>

### Important Note

<details>
<summary>Click to view</summary>

<br/>

**The following instructions are required for the tests to pass**

- You have to use normal HTML elements to style the React Components. Usage of `styled-components` (CSS in JS) to style React components is not supported. Test cases won't be passed, if you use styled components.
- Refer to the below example for the usage of `testid` in the HTML elements.
  - Example: `<div testid="slotsList" className="slots-list"/>`
- The HTML unordered list element which consist of HTML list items to display the cars parked should contain the test-id with value as `slotsList`
- Responsiveness is not required.
- No need to use the Routes.

</details>

### Resources

<details>
<summary>Image URLs</summary>

[https://res.cloudinary.com/dbc9s4sim/image/upload/q\_auto:best/v1650726579/Car%20Parking%20Slots/localhost\_3000\_\_t5yzqi.png](https://res.cloudinary.com/dbc9s4sim/image/upload/q_auto:best/v1650726579/Car%20Parking%20Slots/localhost_3000__t5yzqi.png) - alt should be **car parking slots**

</details>

<details>
<summary>Colors</summary>

<br/>

<div style="background-color: #94a3b8; width: 150px; padding: 10px; color: white">Hex: #94a3b8</div>
<div style="background-color: #1c1d37; width: 150px; padding: 10px; color: white">Hex: #1c1d37</div>
<div style="background-color: #ffffff; width: 150px; padding: 10px; color: black">Hex: #ffffff</div>
<div style="background-color: #292942; width: 150px; padding: 10px; color: white">Hex: #292942</div>
<div style="background-color: #10111e; width: 150px; padding: 10px; color: white">Hex: #10111e</div>
<div style="background-color: #3b82f6; width: 150px; padding: 10px; color: black">Hex: #3b82f6</div>
<div style="background-color: #ff0000; width: 150px; padding: 10px; color: black">Hex: #ff0000</div>
</details>

<details>
<summary>Font-families</summary>

- Roboto

</details>

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - Don't change the component folder names as those are the files being imported into the tests.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
