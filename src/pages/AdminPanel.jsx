// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../config/firbase/firebase';
// import Swal from 'sweetalert2';
// import { collection, query, orderBy, onSnapshot, deleteDoc } from "firebase/firestore";

// const AdminPanel = () => {
//   const Navigate = useNavigate();
//   const [drivers, setDrivers] = useState([]);  
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         Navigate("/");  
//       }
//     })
//     const ref = query(collection(db, "drivers"), orderBy("Posttime", "desc"));
    
//     // Subscribe to Firestore collection
//     const unsubscribe = onSnapshot(ref, (querySnapshot) => {
//       const driversData = [];
//       querySnapshot.forEach((doc) => {
//         driversData.push({ ...doc.data(), docid: doc.id });
//       });
//       setDrivers(driversData);  // Update drivers state with new data
//     });

//     return () => {
//       unsubscribe();  // Cleanup listener on component unmount
//     };
//   }, []);  
 
//   const Delete = async (driverId)=>{
//   try {
//     const driverRef = doc(db, "drivers", driverId);
//     await deleteDoc(driverRef);
//     Swal.fire("Driver deleted successfully!");
//   } catch (error) {
//     Swal.fire("Error Occured!");
//   }
//   }
//   const Edit = async (driverId)=>{

//   }

//   const logout = () => {
//     signOut(auth).then(() => {
//       Swal.fire("Signed out successfully");
//       Navigate("/");  
//     }).catch((error) => {
//       Swal.fire("Error during sign out:", error.message);
//     });
//   };




//   return (
//     <>
//       {/* Admin Header */}
//       <div className="flex justify-between items-center font-bold bg-green-700 py-2 text-white px-6">
//         <h1 className="text-2xl">InDrive Admin Panel</h1>
//         <button onClick={logout} className="btn btn-white">
//           Logout
//         </button>
//       </div>

//       <div className="bg-green-100 min-h-[90vh] p-6">
//         <h2 className="text-3xl text-center font-bold text-gray-700 py-5">All Driver List</h2>

//         <div className="overflow-x-auto border-1 bg-slate-50">
//           <table className="table table-zebra w-full">
//             <thead className="text-xl font-semibold border-8">
//               <tr>
//                 <th>Profile</th>
//                 <th>Full Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Vehicle</th>
//                 <th>Plate Number</th>
//                 <th>License Number</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {drivers.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-4 text-gray-600">No drivers found!</td>
//                 </tr>
//               ) : (
//                 drivers.map((driver, index) => (
//                   <tr key={driver.id || `${index}`}>
//                     <td>{driver.Name}</td>
//                     <td>{driver.email}</td>
//                     <td>{driver.Phone}</td>
//                     <td>{driver.Vehicle}</td>
//                     <td>{driver.PlateNumber}</td>
//                     <td>{driver.License}</td>
//                     <td className="space-x-2">
//                       <button onClick={()=>Edit(driver.docid)} className='btn btn-success btn-sm'>Edit</button>
//                       <button onClick={()=>Delete(driver.docid)} className='btn btn-error btn-sm'>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminPanel;

import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firbase/firebase';
import Swal from 'sweetalert2';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";

const AdminPanel = () => {
  const Navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [editDriver, setEditDriver] = useState(null); // Store the driver data to be edited
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        Navigate("/"); // Redirect to login if the user is not authenticated
      }
    });

    const ref = query(collection(db, "drivers"), orderBy("Posttime", "desc"));
    
    // Subscribe to Firestore collection
    const unsubscribeQuery = onSnapshot(ref, (querySnapshot) => {
      const driversData = [];
      querySnapshot.forEach((doc) => {
        driversData.push({ ...doc.data(), docid: doc.id }); // Attach doc.id as 'id' to data
      });
      setDrivers(driversData); // Update drivers state with new data
    });

    return () => {
      unsubscribeQuery();
    };
  }, []);

  // Handle logout
  const logout = () => {
    signOut(auth).then(() => {
      Swal.fire("Signed out successfully");
      Navigate("/"); // Redirect to home or login page
    }).catch((error) => {
      Swal.fire("Error during sign out:", error.message);
    });
  };

  // Handle delete
  const Delete = async (driverId) => {
    try {
      const driverRef = doc(db, "drivers", driverId);
      await deleteDoc(driverRef);
      Swal.fire("Driver deleted successfully!");
    } catch (error) {
      Swal.fire("Error Occured!", error.message);
    }
  };

  // Handle form submission for editing a driver
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phone, vehicle, plate, license } = e.target.elements;

    const updatedData = {
      Name: fullName.value,
      email: email.value,
      Phone: phone.value,
      Vehicle: vehicle.value,
      PlateNumber: plate.value,
      License: license.value,
    };

    try {
      setLoading(true);
      const driverRef = doc(db, "drivers", editDriver.docid);
      await updateDoc(driverRef, updatedData);
      Swal.fire("Driver updated successfully!");
      setEditDriver(null); // Close the edit form
    } catch (error) {
      Swal.fire("Error updating driver:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Open the edit form with pre-filled data
  const openEditForm = (driver) => {
    setEditDriver(driver); // Set the driver data to be edited
  };

  return (
    <>
      {/* Admin Header */}
      <div className="flex justify-between items-center font-bold bg-green-700 py-2 text-white px-6">
        <h1 className="text-2xl">InDrive Admin Panel</h1>
        <button onClick={logout} className="btn btn-white">
          Logout
        </button>
      </div>

      <div className="bg-green-100 min-h-[90vh] p-6">
        <h2 className="text-3xl text-center font-bold text-gray-700 py-5">All Driver List</h2>

        <div className="overflow-x-auto border-1 bg-slate-50">
          <table className="table table-zebra w-full">
            <thead className="text-xl font-semibold border-8">
              <tr>
                {/* <th>Profile</th> */}
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Plate Number</th>
                <th>License Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-600">No drivers found!</td>
                </tr>
              ) : (
                drivers.map((driver, index) => (
                  <tr key={driver.docid || `${index}`}>
                    <td>{driver.Name}</td>
                    <td>{driver.email}</td>
                    <td>{driver.Phone}</td>
                    <td>{driver.Vehicle}</td>
                    <td>{driver.PlateNumber}</td>
                    <td>{driver.License}</td>
                    <td className="space-x-2">
                      <button onClick={() => openEditForm(driver)} className='btn btn-success btn-sm'>Edit</button>
                      <button onClick={() => Delete(driver.docid)} className='btn btn-error btn-sm'>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Driver Form Modal */}
      {editDriver && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Driver</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="input input-bordered w-full"
                  defaultValue={editDriver.Name}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  defaultValue={editDriver.email}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full"
                  defaultValue={editDriver.Phone}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Vehicle</label>
                <input
                  type="text"
                  name="vehicle"
                  className="input input-bordered w-full"
                  defaultValue={editDriver.Vehicle}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Plate Number</label>
                <input
                  type="text"
                  name="plate"
                  className="input input-bordered w-full"
                  defaultValue={editDriver.PlateNumber}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">License Number</label>
                <input
                  type="text"
                  name="license"
                  className="input input-bordered w-full"
                  defaultValue={editDriver.License}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditDriver(null)}  // Close the form without saving
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
