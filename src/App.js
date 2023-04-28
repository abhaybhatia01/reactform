import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';
import { Container, FloatingLabel, Row, Col } from 'react-bootstrap';

function App() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const confirmationError = useRef(null);
  const progressBar = useRef(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (password !== confirmation) {
      event.preventDefault();
      event.stopPropagation();
      confirmationError.current.style.display = null;
    } else {
      confirmationError.current.style.display = 'none';
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    const letterMatch = (password.match(/[a-z, A-Z]/g) || []).length;
    const numberMatch = (password.match(/[0-9]/g) || []).length;
    const specialMatch = (password.match(/[#?!@$%^&*-]/g) || []).length;

    const strength = letterMatch + numberMatch * 2 + specialMatch * 3;
    progressBar.current.style.width = `${strength * 3}%`;
    let color = 'red';
    if (strength > 10) {
      color = 'orange';
    }
    if (strength > 26) {
      color = 'green';
    }
    progressBar.current.style.backgroundColor = color;
  };

  return (
    <div className='form-wrapper container d-flex flex-column justify-content-center mt-4'>
      <div className=' d-flex  justify-content-center align-items-center mt-1'>
        <svg className='m-4' width="180" height="34" viewBox="0 0 180 34" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path className='logo-svg' d="M43.5852 6.8796H47.8442V23.1069H55.7377V26.7694H43.5852V6.8796Z" fill="#2E343F"/>
          <path className='logo-svg' d="M57.655 23.3911C57.003 22.1895 56.6747 20.8391 56.7024 19.4723C56.6747 18.1056 57.003 16.7551 57.655 15.5536C58.275 14.4309 59.2139 13.5172 60.3529 12.9278C61.6152 12.3192 62.9984 12.0032 64.3997 12.0032C65.801 12.0032 67.1843 12.3192 68.4465 12.9278C69.5839 13.5195 70.5221 14.4327 71.1444 15.5536C71.7933 16.7562 72.1201 18.1061 72.0931 19.4723C72.1235 20.844 71.7965 22.2 71.1444 23.4071C70.5179 24.5208 69.5804 25.4277 68.4465 26.0169C67.1843 26.6254 65.801 26.9415 64.3997 26.9415C62.9984 26.9415 61.6152 26.6254 60.3529 26.0169C59.2139 25.4275 58.275 24.5137 57.655 23.3911ZM68.0342 19.4723C68.0793 18.3726 67.7253 17.2936 67.0375 16.4342C66.7138 16.0552 66.308 15.7548 65.851 15.5558C65.394 15.3568 64.8977 15.2643 64.3997 15.2854C63.902 15.2654 63.4064 15.36 62.9511 15.562C62.4958 15.764 62.0931 16.0679 61.7739 16.4502C61.0902 17.311 60.7418 18.3904 60.7932 19.4884C60.7418 20.5863 61.0902 21.6657 61.7739 22.5265C62.0931 22.9088 62.4958 23.2127 62.9511 23.4147C63.4064 23.6167 63.902 23.7113 64.3997 23.6913C64.9003 23.7085 65.3982 23.6111 65.8554 23.4064C66.3126 23.2017 66.7169 22.8953 67.0375 22.5105C67.7253 21.6511 68.0793 20.5721 68.0342 19.4723Z" fill="#2E343F"/>
          <path className='logo-svg' d="M74.6908 23.3911C74.0388 22.1896 73.7105 20.8391 73.7382 19.4724C73.7105 18.1056 74.0388 16.7551 74.6908 15.5536C75.3109 14.431 76.2497 13.5172 77.3887 12.9278C78.6503 12.3193 80.0329 12.0033 81.4335 12.0033C82.8342 12.0033 84.2168 12.3193 85.4783 12.9278C86.6174 13.5172 87.5562 14.431 88.1762 15.5536C88.8282 16.7551 89.1565 18.1056 89.1289 19.4724C89.1599 20.8446 88.8315 22.201 88.1762 23.4071C87.552 24.5225 86.6138 25.43 85.4783 26.0169C84.2168 26.6254 82.8342 26.9414 81.4335 26.9414C80.0329 26.9414 78.6503 26.6254 77.3887 26.0169C76.2497 25.4275 75.3109 24.5137 74.6908 23.3911ZM85.0701 19.4724C85.1196 18.3746 84.7714 17.2958 84.0894 16.4342C83.7541 16.0673 83.346 15.7742 82.8911 15.5736C82.4363 15.3731 81.9446 15.2695 81.4475 15.2695C80.9504 15.2695 80.4588 15.3731 80.0039 15.5736C79.5491 15.7742 79.141 16.0673 78.8057 16.4342C78.1308 17.2986 77.7898 18.3771 77.845 19.4724C77.7943 20.5696 78.1411 21.6483 78.8217 22.5105C79.157 22.8774 79.5651 23.1705 80.0199 23.3711C80.4748 23.5716 80.9664 23.6752 81.4635 23.6752C81.9606 23.6752 82.4523 23.5716 82.9071 23.3711C83.362 23.1705 83.7701 22.8774 84.1054 22.5105C84.7817 21.6467 85.1242 20.5681 85.0701 19.4724Z" fill="#2E343F"/>
          <path className='logo-svg' d="M95.3452 6.8796V18.3916L101.081 12.1753H105.568L100.365 17.8832L105.864 26.7694H101.225L97.5347 20.8653L95.3452 23.219V26.7694H91.3424V6.8796H95.3452Z" fill="#2E343F"/>
          <path className='logo-svg' d="M110.792 23.4751C111.438 23.904 112.202 24.1195 112.977 24.0916C113.668 24.1271 114.356 23.9895 114.979 23.6913C115.209 23.5874 115.402 23.418 115.536 23.2044C115.67 22.9908 115.738 22.7425 115.731 22.4905C115.744 22.3318 115.719 22.1724 115.66 22.0246C115.601 21.8768 115.509 21.7445 115.391 21.6379C115.106 21.429 114.775 21.2917 114.426 21.2376C114.026 21.1535 113.33 21.0535 112.381 20.9414C111.298 20.8112 110.227 20.593 109.179 20.2889C108.397 20.0641 107.691 19.6327 107.133 19.0401C106.598 18.407 106.324 17.5943 106.365 16.7665C106.354 15.8643 106.635 14.9827 107.165 14.2527C107.724 13.4938 108.486 12.9083 109.363 12.5636C110.401 12.1496 111.512 11.9468 112.629 11.9671C114.617 11.9858 116.218 12.4115 117.433 13.244C118.016 13.6209 118.499 14.1327 118.843 14.736C119.186 15.3394 119.38 16.0166 119.406 16.7104H115.603C115.573 16.4342 115.479 16.1688 115.329 15.9348C115.179 15.7008 114.977 15.5046 114.739 15.3615C114.139 14.9899 113.442 14.8071 112.737 14.8371C112.1 14.8076 111.467 14.9544 110.908 15.2614C110.699 15.3694 110.524 15.5324 110.401 15.7328C110.279 15.9331 110.213 16.1632 110.212 16.3982C110.202 16.5465 110.231 16.6947 110.296 16.8285C110.36 16.9624 110.458 17.0774 110.58 17.1628C110.872 17.3526 111.201 17.4793 111.544 17.535C111.945 17.6071 112.605 17.6951 113.546 17.7872C115.515 18.0167 117.026 18.4383 118.077 19.0521C119.126 19.6685 119.65 20.7212 119.65 22.2183C119.664 23.1218 119.369 24.003 118.814 24.716C118.204 25.4728 117.398 26.0475 116.484 26.3772C115.38 26.7856 114.21 26.9838 113.033 26.9616C111.008 26.9616 109.362 26.5119 108.094 25.6126C107.491 25.2033 106.995 24.6559 106.647 24.016C106.299 23.3761 106.109 22.6623 106.093 21.9341H109.867C109.894 22.2442 109.992 22.5441 110.152 22.8111C110.312 23.0781 110.531 23.3052 110.792 23.4751Z" fill="#2E343F"/>
          <path className='logo-svg' d="M128.876 26.9415C127.495 26.9728 126.128 26.6548 124.902 26.0169C123.786 25.4202 122.873 24.5065 122.276 23.3911C121.645 22.1827 121.329 20.8351 121.355 19.4724C121.325 18.1054 121.642 16.753 122.276 15.5416C122.879 14.4284 123.798 13.5188 124.918 12.9278C126.153 12.2885 127.53 11.9705 128.921 12.0032C130.871 12.0032 132.46 12.5008 133.688 13.4962C134.943 14.5339 135.756 16.0111 135.961 17.6271H131.803C131.664 16.9564 131.305 16.3517 130.782 15.9099C130.245 15.4734 129.568 15.2459 128.876 15.2694C128.398 15.2533 127.922 15.3504 127.488 15.5528C127.054 15.7552 126.674 16.0572 126.379 16.4342C125.723 17.3074 125.392 18.3816 125.442 19.4724C125.392 20.5631 125.723 21.6373 126.379 22.5105C126.672 22.8905 127.052 23.1955 127.486 23.4008C127.92 23.606 128.396 23.7056 128.876 23.6913C129.582 23.7161 130.274 23.4843 130.822 23.0388C131.356 22.5783 131.713 21.9454 131.831 21.2496H135.949C135.762 22.8833 134.954 24.3824 133.692 25.4365C132.451 26.4399 130.846 26.9415 128.876 26.9415Z" fill="#2E343F"/>
          <path className='logo-svg' d="M138.287 23.3911C137.635 22.1896 137.307 20.8391 137.334 19.4724C137.307 18.1056 137.635 16.7551 138.287 15.5536C138.907 14.431 139.846 13.5172 140.985 12.9278C142.246 12.3193 143.629 12.0033 145.03 12.0033C146.43 12.0033 147.813 12.3193 149.075 12.9278C150.214 13.5172 151.152 14.431 151.772 15.5536C152.424 16.7551 152.753 18.1056 152.725 19.4724C152.756 20.8446 152.428 22.201 151.772 23.4071C151.154 24.5197 150.223 25.4269 149.095 26.0169C147.833 26.6254 146.45 26.9414 145.05 26.9414C143.649 26.9414 142.266 26.6254 141.005 26.0169C139.858 25.4307 138.912 24.5166 138.287 23.3911ZM148.666 19.4724C148.716 18.3746 148.368 17.2958 147.686 16.4342C147.35 16.0673 146.942 15.7742 146.487 15.5736C146.032 15.3731 145.541 15.2695 145.044 15.2695C144.547 15.2695 144.055 15.3731 143.6 15.5736C143.145 15.7742 142.737 16.0673 142.402 16.4342C141.721 17.2964 141.374 18.3751 141.425 19.4724C141.374 20.5696 141.721 21.6483 142.402 22.5105C142.737 22.8774 143.145 23.1705 143.6 23.3711C144.055 23.5716 144.547 23.6752 145.044 23.6752C145.541 23.6752 146.032 23.5716 146.487 23.3711C146.942 23.1705 147.35 22.8774 147.686 22.5105C148.369 21.6494 148.719 20.5706 148.67 19.4724H148.666Z" fill="#2E343F"/>
          <path className='logo-svg' d="M168.684 26.7694H165.138L164.765 25.0082C164.253 25.6444 163.598 26.1509 162.853 26.4868C162.108 26.8227 161.295 26.9784 160.478 26.9415C159.712 26.9708 158.947 26.8463 158.23 26.5755C157.512 26.3046 156.856 25.8929 156.3 25.3644C155.232 24.3157 154.698 22.5598 154.698 20.0968V12.1753H158.701V19.6124C158.701 20.9414 158.933 21.9381 159.398 22.6105C159.639 22.9482 159.963 23.2182 160.339 23.3948C160.714 23.5714 161.129 23.6487 161.543 23.6192C161.993 23.6395 162.441 23.5477 162.847 23.3521C163.253 23.1565 163.604 22.8632 163.869 22.4984C164.421 21.7499 164.693 20.7012 164.693 19.3603V12.1753H168.696L168.684 26.7694Z" fill="#2E343F"/>
          <path className='logo-svg' d="M170.105 15.5536V12.1753H172.507V8.08043H176.51V12.1753H179.832V15.5536H176.51V21.9581C176.474 22.3554 176.589 22.7516 176.834 23.0668C176.985 23.1939 177.159 23.2895 177.348 23.3479C177.536 23.4063 177.734 23.4265 177.931 23.4071H180V26.7854H176.714C173.928 26.7854 172.536 25.3938 172.539 22.6105V15.5536H170.105Z" fill="#2E343F"/>
          <path className='logo-svg' d="M20.7846 3.79995L0 15.8V8.59995L14.5538 0.199951L20.7846 3.79995Z" fill="#2E343F"/>
          <path className='logo-svg' d="M29.1077 8.59995V12.7538L3.6 27.4769L0 25.3999V21.4923L25.7077 6.6461L29.1077 8.59995Z" fill="#2E343F"/>
          <path className='logo-svg' d="M8.52308 30.323L29.1077 18.4461V25.3999L14.5538 33.7999L8.52308 30.323Z" fill="#2E343F"/>
        </svg>
      </div>

      <div className='full-form'>
        <Container fluid  className='p-0'>
          <Container className=' d-flex justify-content-center align-items-center p-0 pt-4 pb-4  form-top' >
            <Container className='d-flex flex-column justify-content-between align-items-center p-0  '>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='s-1 active-s-1' x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
                <path className='s-2 active-s-2'  d="M13.3333 14V12.6667C13.3333 11.1939 14.5273 10 16 10C17.4728 10 18.6667 11.1939 18.6667 12.6667V14M13.4667 22H18.5333C19.2801 22 19.6534 22 19.9387 21.8547C20.1895 21.7268 20.3935 21.5229 20.5214 21.272C20.6667 20.9868 20.6667 20.6134 20.6667 19.8667V16.1333C20.6667 15.3866 20.6667 15.0132 20.5214 14.728C20.3935 14.4771 20.1895 14.2732 19.9387 14.1453C19.6534 14 19.2801 14 18.5333 14H13.4667C12.7199 14 12.3466 14 12.0614 14.1453C11.8105 14.2732 11.6065 14.4771 11.4787 14.728C11.3333 15.0132 11.3333 15.3866 11.3333 16.1333V19.8667C11.3333 20.6134 11.3333 20.9868 11.4787 21.272C11.6065 21.5229 11.8105 21.7268 12.0614 21.8547C12.3466 22 12.7199 22 13.4667 22Z" stroke="#437EF7" stroke-width="2" stroke-linecap="round"/>
                <rect className='s-3 active-s-3'  x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#648EF7"/>
              </svg>
              <h2 className='multi-form-heading active'>Account</h2>
            </Container>

            <Container className='d-flex flex-column justify-content-center align-items-center p-0 '>
              <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='s-1' x="0.833313" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
                <path className='s-2' d="M16.3333 17.3334C18.1743 17.3334 19.6666 15.841 19.6666 14C19.6666 12.1591 18.1743 10.6667 16.3333 10.6667C14.4924 10.6667 13 12.1591 13 14C13 15.841 14.4924 17.3334 16.3333 17.3334ZM16.3333 17.3334C13.3878 17.3334 11 19.1242 11 21.3334M16.3333 17.3334C19.2788 17.3334 21.6666 19.1242 21.6666 21.3334" stroke="#5F6D7E" stroke-width="2" stroke-linecap="round"/>
                <rect className='s-3' x="0.833313" y="0.5" width="31" height="31" rx="15.5" stroke="#DAE0E6"/>
              </svg>
              <h2 className='multi-form-heading' >Personal</h2>
            </Container>      

            <Container className='d-flex flex-column justify-content-center align-items-center p-0 '>
              <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='s-1' x="1.16663" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
                <path className='s-2' d="M20 13.3333C20 11.8606 18.8061 10.6666 17.3333 10.6666H16C14.5272 10.6666 13.3333 11.8606 13.3333 13.3333C13.3333 14.8061 14.5272 16 16 16H17.3333C18.8061 16 20 17.1939 20 18.6666C20 20.1394 18.8061 21.3333 17.3333 21.3333H16C14.5272 21.3333 13.3333 20.1394 13.3333 18.6666M16.6666 9.33331L16.6666 22.6666" stroke="#5F6D7E" stroke-width="2" stroke-linecap="round"/>
                <rect className='s-3' x="1.16663" y="0.5" width="31" height="31" rx="15.5" stroke="#DAE0E6"/>
              </svg>
              <h2 className='multi-form-heading'>Billing</h2>
            </Container>      

            <Container className='d-flex flex-column justify-content-center align-items-center p-0 '>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='s-1' x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
                <path className='s-2' d="M10.6667 15.6198L10.6667 20.2865M13 15.3447V19.715C13 20.4514 13.597 21.0484 14.3334 21.0484H19.5935C20.2201 21.0484 20.7621 20.6121 20.896 20L21.823 15.7623C21.914 15.3465 21.5973 14.9531 21.1718 14.9531H18.6667C17.9303 14.9531 17.3334 14.3562 17.3334 13.6198V12.698C17.3334 12.0076 17.0591 11.3455 16.571 10.8574C16.2774 10.5639 15.7879 10.6165 15.5634 10.9656L13.2118 14.6237C13.0735 14.8388 13 15.0891 13 15.3447Z" stroke="#5F6D7E" stroke-width="2" stroke-linecap="round"/>
                <rect className='s-3' x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#DAE0E6"/>
              </svg>
              <h2 className='multi-form-heading'>Done</h2>
            </Container>      

          </Container>
        </Container>



      <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-3'>

        <Container fluid className="input-container" >
          <Row>
              <Form.Group className='mb-3' controlId='firstnamLabel'>
              <Form.Label  className='label' >Name</Form.Label>
              <Form.Control className='input' type='text' placeholder='First name' required />
              </Form.Group>
          </Row>

          <Row>
            
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label className='label'>Email*</Form.Label>
                <Form.Control
                  className='input'
                  type='email'
                  placeholder='Enter email'
                  required
                  pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
                />
                <Form.Control.Feedback className='validation-error' type='invalid'>
                Please input a real Email Address
                </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Col sm={6}>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label  className='label' >Password*</Form.Label>
                  <Form.Control
                    className='input'
                    type='password'
                    placeholder='Password'
                    required
                    pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                    <Form.Text className='text-muted validation-error' >
                    Please enter your password
              </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className='mb-3' controlId='formBasicConfirmation'>
              <Form.Label  className='label'>Confirm Password*</Form.Label>
                  <Form.Control
                    className='input'
                    type='password'
                    placeholder='Confirm Password'
                    required
                    onChange={(e) => setConfirmation(e.target.value)}
                  />
                <p
                style={{ color: 'red', display: 'none' }}
                ref={confirmationError}
                className='validation-error'
              >
                Passwords need to match
              </p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group className='mb-3' controlId='formBasicNewsletter'>
              <Form.Check
                type='checkbox'
                label='I accept the Terms and Privacy Policy'
                required="required"
                className='label'
              />
            </Form.Group>
          </Row>
          
        </Container>
        <Container className='d-flex justify-content-end align-items-center pb-3 pt-3 pe-4 form-bottom' >
            <Button className='d-flex justify-content-center align-items-center' variant='primary' type='submit'>
              <span className='p-1 me-2'>Next </span>
              <svg width="7" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.33334 1L5.74409 5.41074C6.06953 5.73618 6.06953 6.26382 5.74409 6.58926L1.33334 11" stroke="white" stroke-width="1.67" stroke-linecap="round"/>
              </svg>
            </Button>
        </Container>
      </Form>
      </div>
    </div>
  );
}

export default App;
