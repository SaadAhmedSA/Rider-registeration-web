import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth, db } from '../config/firbase/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Riderreg = () => {
  const Navigate = useNavigate();
  const [uid, setUid] = useState(null); // Store uid in state
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const FullName = useRef(null);
  const Email = useRef(null);
  const phone = useRef(null);
  const cnic = useRef(null);
  const Li_num = useRef(null);
  const PlateNumber = useRef(null);

  useEffect(() => {
    // Listen for auth state change
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        Navigate("/");
      } else {
        setUid(user.uid); // Set the user ID when logged in
      }
    });
  }, [Navigate]);

  const register = async (event) => {
    event.preventDefault();


    try {
      const docRef = await addDoc(collection(db, "drivers"), {
        Name: FullName.current.value,
        email: Email.current.value,
        Phone: phone.current.value,
        cnic: cnic.current.value,
        License: Li_num.current.value,
        PlateNumber: PlateNumber.current.value,
        Vehicle: selected,
        id: uid,
        Posttime :serverTimestamp(),
      });
      Swal.fire("Registered Successfully");
    } catch (error) {
      Swal.fire("Error registering", error.message, "error");
    }
  };

  const vehicleData = {
    Car: {
      Suzuki: ['Alto', 'Cultus', 'Wagon-R', 'Mehran'],
      Daihatsu: ['Mira', 'Coure'],
    },
    Motorcycle: {
      Honda: ['CD-70'],
      Unique: ['UD-70'],
      Super_Power: ['SS-70'],
    },
  };

  const handleItemClick = (category, model, subModel) => {
    setSelected(`${category} (${model} - ${subModel})`);
    setOpen(false); // Close dropdown after selection
  };

  const logout = () => {
    signOut(auth).then(() => {
      Swal.fire("Signed out successfully");
      Navigate("/");
    }).catch((error) => {
      Swal.fire("Error signing out", error.message, "error");
    });
  };

  return (
    <>
      <div className="flex justify-around items-center font-bold bg-green-700 py-2 text-white px-6">
        <h1 className="text-2xl">InDrive Registration App</h1>
        <button onClick={logout} className="btn btn-white">
          logout
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center bg-green-100 pt-5">
        <h1 className="text-3xl font-bold text-green-800 mt-2">Registration Form</h1>

        <form
          className="bg-green-300 p-6 flex flex-row flex-wrap justify-center gap-2 items-center rounded-lg shadow-lg w-full max-w-lg mt-2 font-semibold"
          onSubmit={register}
        >
          {/* Full Name */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              ref={FullName}
              required
            />
          </div>

          {/* Email */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="input input-bordered w-full"
              ref={Email}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              placeholder="0300 5678901"
              className="input input-bordered w-full"
              ref={phone}
              required
            />
          </div>

          {/* CNIC Number */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">CNIC Number</span>
            </label>
            <input
              type="tel"
              placeholder="42101-123456-1"
              className="input input-bordered w-full"
              required
              ref={cnic}
            />
          </div>

          {/* License Number */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">License Number</span>
            </label>
            <input
              type="text"
              placeholder="ABC123456"
              className="input input-bordered w-full"
              required
              ref={Li_num}
            />
          </div>

          {/* Vehicle Plate Number */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Vehicle Plate Number</span>
            </label>
            <input
              type="text"
              placeholder="XYZ 1234"
              className="input input-bordered w-full"
              ref={PlateNumber}
              required
            />
          </div>

          {/* Vehicle Dropdown */}
          <div className="form-control mb-4 relative">
            <label className="label">
              <span className="label-text">Vehicle Category and Model</span>
            </label>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full text-left px-4 py-2 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none"
            >
              {selected ? selected : 'Select Vehicle Category and Model'}
            </button>

            {/* Dropdown List */}
            {open && (
              <ul className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-auto border border-gray-300 z-10">
                {Object.keys(vehicleData).map((category) => (
                  <li key={category} className="p-2 bg-gray-100 cursor-pointer">
                    <div className="font-semibold">{category}</div>
                    <ul className="pl-4 mt-2">
                      {Object.keys(vehicleData[category]).map((model) => (
                        <li key={model} className="p-2 cursor-pointer">
                          <div className="font-medium">{model}</div>
                          <ul className="pl-4 mt-2">
                            {vehicleData[category][model].map((subModel, index) => (
                              <li
                                key={index}
                                className="p-2 hover:bg-gray-400 cursor-pointer"
                                onClick={() => handleItemClick(category, model, subModel)}
                              >
                                {subModel}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-4 py-2">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Riderreg;
