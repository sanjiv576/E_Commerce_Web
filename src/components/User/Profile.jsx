import React, { useEffect, useState } from 'react'
import { ResponsiveAppBarHomepage } from '../AppBar/ResponsiveAppBarHomepage';
import { usePurchase } from '../../utils/purchaseContext';
import userServices from '../../services/userService';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MailLockIcon from '@mui/icons-material/MailLock';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PasswordIcon from '@mui/icons-material/Password';
import { MySnackbar } from '../MySnackbar';
import sound from '../../assets/sound.wav';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

    const purchase = usePurchase();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [file, setFile] = useState(null);
    const [snack, setSnack] = useState({
        type: '',
        message: '',
    });
    // for open and close snackbar
    const [open, setOpen] = React.useState(false);

    // for closing snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const play = () => new Audio(sound).play();



    useEffect(() => {
        userServices.getUser()
            .then(res => setUser(res.data))
            .catch(err => window.alert(err.response.data.error));
    }, []);


    const handleUpload = (e) => {
        e.preventDefault();

        if (!file) {
            play();
            setSnack({
                type: 'error',
                message: 'Please, select a file',
            });
            setOpen(true);
            return;
        }

    }


    return (
        <div>
            <ResponsiveAppBarHomepage purchaseProductLength={purchase.purchase.length} />
            <div className="avatar">
                <div className="w-60 rounded m-10">
                    <img src={`http://localhost:3005/profile/${user.picture}`} />
                </div>
            </div>

            <div className="">
                <form>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required />

                    <Button variant='contained' onClick={handleUpload} startIcon={<CloudUploadIcon />} className="btn btn-secondary" >Upload Picture Pic</Button>

                </form>

            </div>
            <div className="user-details-section m-4">
                <h3 className='text-2xl font-bold m-2'>Full Name: {user.fullName}</h3>
                <h3 className='text-2xl font-bold m-2'>Email: {user.email}</h3>

            </div>

            <div className="change-info-section m-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">

                <Button variant='contained' onClick={handleUpload} startIcon={<MailLockIcon />} className="btn mb-4" >Change email</Button>

                <Button variant='contained' onClick={() => navigate('/changePassword')} startIcon={<PasswordIcon />} className="btn btn-secondary" >Change password</Button>
                <Button variant='contained' onClick={handleUpload} startIcon={<PersonRemoveIcon />} className="btn btn-secondary" >Delete Account</Button>

            </div>

            <MySnackbar open={open} handleClose={handleClose} type={snack.type} message={snack.message} />
        </div>
    )
}
