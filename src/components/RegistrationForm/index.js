import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isSubmitSuccess: false,
    showFirstNameError: false,
    showLastNameError: false,
  }

  onLastNameBlurEvent = () => {
    const isLastNameValid = this.validateLastName()

    this.setState({showLastNameError: !isLastNameValid})
  }

  changeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  validateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isFirstNameValid = this.validateFirstName()
    const isLastNameValid = this.validateLastName()
    if (isFirstNameValid && isLastNameValid) {
      this.setState({isSubmitSuccess: true})
    } else {
      this.setState({
        showFirstNameError: !isFirstNameValid,
        showLastNameError: !isLastNameValid,
        isSubmitSuccess: false,
      })
    }
  }

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  changeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onFirstNameBlurEvent = () => {
    const isFirstNameValid = this.validateFirstName()
    this.setState({showFirstNameError: !isFirstNameValid})
  }

  submitAnother = () => {
    this.setState(prevState => ({
      isSubmitSuccess: !prevState.isSubmitSuccess,
      firstName: '',
      lastName: '',
    }))
  }

  renderRegistration = () => {
    const {
      showFirstNameError,
      showLastNameError,
      firstName,
      lastName,
    } = this.state
    const lastNameClass = showLastNameError ? 'wrong-input' : 'username-input'
    const firstNameClass = showFirstNameError ? 'wrong-input' : 'username-input'

    return (
      <>
        <h1 className="main-heading">Registration</h1>
        <form onSubmit={this.onSubmitForm} className="form-container">
          <label className="label" htmlFor="username">
            FIRST NAME
          </label>
          <input
            onBlur={this.onFirstNameBlurEvent}
            onChange={this.changeFirstName}
            id="username"
            type="text"
            value={firstName}
            className={firstNameClass}
            placeholder="First name"
          />
          {showFirstNameError && <p className="error-message">Required</p>}
          <label className="label" htmlFor="username">
            LAST NAME
          </label>
          <input
            onBlur={this.onLastNameBlurEvent}
            onChange={this.changeLastName}
            value={lastName}
            id="username"
            type="text"
            className={lastNameClass}
            placeholder="First name"
          />
          {showLastNameError && <p className="error-message">Required</p>}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </>
    )
  }

  renderSubmitSuccess = () => (
    <div className="form-container">
      <img
        className="success-image"
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p className="success-message">Submitted Successfully</p>
      <button onClick={this.submitAnother} className="button" type="button">
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isSubmitSuccess} = this.state
    return (
      <div className="bg-container">
        {isSubmitSuccess
          ? this.renderSubmitSuccess()
          : this.renderRegistration()}
      </div>
    )
  }
}
export default RegistrationForm
