import { Chip, FormControl, Avatar, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useState } from 'react'
import PasswordIcon from '@mui/icons-material/Password';
import sound from '../../assets/sound.wav';
import { MySnackbar } from '../MySnackbar';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailLockIcon from '@mui/icons-material/MailLock';
import { useNavigate } from 'react-router-dom';
import { ResponsiveAppBarLandingPage } from '../AppBar/ResponsiveAppBarLandingPage';

const Signup = () => {

    const navigate = useNavigate();

    const [snack, setSnack] = useState({
        type: '',
        message: '',
    });
    // for open and close snackbar
    const [open, setOpen] = React.useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // for closing snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const play = () => new Audio(sound).play();

    const handleSignup = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            play();
            setSnack({
                type: 'error',
                message: 'Password and confirm password must be same',
            });
            setOpen(true);
            return;
        }

    };

    return (
        <div>
            <ResponsiveAppBarLandingPage />
            <div className="gb-darkzero h-screen w-screen">
                <div className="w-[80] mx-auto" align="center" >
                    <div className='mx-auto pt-10'>

                        <div style={{
                            border: '1px solid green',
                            boxShadow: "0 0 50px rgb(26, 176, 23) ",

                        }}
                            className="rounded-lg mt-3 text-white bg-indigo-500 p-5 m-auto lg:w-[500px] md:w-[400px] sm:w-[300px]"
                            align="center"
                        >
                            <div className="text-3xl font-bold">
                                Create your account
                            </div>

                            <div className="mt-5">

                                <form action="" onSubmit={handleSignup}>
                                    <div className="old-password-section">
                                        <div className="mt-3 mb-2" align="left">
                                            Email:
                                        </div>
                                        <OutlinedInput
                                            placeholder='Enter email here...'
                                            className='input input-bordered input-accent w-full'
                                            style={{ color: 'white' }}
                                            onChange={(e) => setEmail(e.target.value)}
                                            startAdornment={<InputAdornment position="start"><MailLockIcon style={{ color: 'white' }} /></InputAdornment>}
                                            type="text"

                                            variant="outlined"
                                            required
                                        />
                                    </div>

                                    <div className="">
                                        <div className="mt-3 mb-2" align="left">
                                            New Password:
                                        </div>
                                        <OutlinedInput
                                            placeholder='Enter new password here...'
                                            className='input input-bordered input-accent w-full'
                                            style={{ color: 'white' }}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            startAdornment={<InputAdornment position="start"><PasswordIcon style={{ color: 'white' }} /></InputAdornment>}
                                            type={isNewPasswordVisible ? 'text' : 'password'}
                                            endAdornment={
                                                <IconButton onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                                                    {isNewPasswordVisible ? <VisibilityOffIcon style={{ color: 'white' }} /> :
                                                        <VisibilityIcon style={{ color: 'white' }} />}
                                                </IconButton>
                                            }
                                            variant="outlined"
                                            required
                                        />
                                    </div>

                                    <div className="">
                                        <div className="mt-3 mb-2" align="left">
                                            Confirm Password:
                                        </div>
                                        <OutlinedInput label="Email"
                                            placeholder='Enter again password here...'
                                            className='input input-bordered input-accent w-full'
                                            style={{ color: 'white' }}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            startAdornment={<InputAdornment position="start"><PasswordIcon style={{ color: 'white' }} /></InputAdornment>}
                                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                                            endAdornment={
                                                <IconButton onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                                    {isConfirmPasswordVisible ? <VisibilityOffIcon style={{ color: 'white' }} /> :
                                                        <VisibilityIcon style={{ color: 'white' }} />}
                                                </IconButton>
                                            }
                                            variant="outlined"
                                            required
                                        />

                                        <input type="submit" value='Signup' className='m-12 btn-primary btn btn-wide' />
                                    </div>
                                </form>

                                <label htmlFor="" className='p-4'>
                                    Already have an account ?
                                </label>
                                <Chip
                                    Avatar={<Avatar>L</Avatar>}
                                    color="success"
                                    label="LOGIN YOUR ACCOUNT"
                                    onClick={() => navigate('/login')}

                                ></Chip>
                                <MySnackbar open={open} handleClose={handleClose} type={snack.type} message={snack.message} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup;