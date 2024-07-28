// import { useState } from "react";
// import * as XLSX from "xlsx";

// function Load1() {
//     const [data, setData] = useState([]);

//     const handleFileUpload = (e) => {
//         const reader = new FileReader();
//         reader.readAsBinaryString(e.target.files[0]);
//         reader.onload = (e) => {
//             const data = e.target.result;
//             const workbook = XLSX.read(data, { type: "binary" });
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
//             const parsedData = XLSX.utils.sheet_to_json(sheet);
//             setData(parsedData);
//         };
//     }
//     return (
//         <div>

//             <input type="file" accept=".xlsx, xls" onChange={handleFileUpload} />

//       {data.length > 0 && (
//         <table className="table">
//           <thead>
//             <tr>
//               {Object.keys(data[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((value, index) => (
//                   <td key={index}>{value}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//         </div>
//     );
// }
 
// export default Load;

// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import * as XLSX from 'xlsx';

// function Load() {
//   const [excelData, setExcelData] = useState(null);

//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       setExcelData(jsonData);
//     };

//     reader.readAsArrayBuffer(file);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.xlsx, .xls' });

//   return (
//     <div>
//       <div {...getRootProps()} style={dropzoneStyles}>
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Déposez le fichier Excel ici...</p>
//         ) : (
//           <p>Glissez et déposez un fichier Excel ici, ou cliquez pour sélectionner un fichier</p>
//         )}
//       </div>
//       {excelData && (
//         <div>
//           <h2>Contenu du fichier Excel :</h2>
//           <table>
//             <thead>
//               <tr>
//                 {Object.keys(excelData[0]).map((key) => (
//                   <th key={key}>{key}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {excelData.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value, idx) => (
//                     <td key={idx}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// const dropzoneStyles = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
// };

// export default Load;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Load = () => {
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData);
        uploadDataToStrapi(jsonData);
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const uploadDataToStrapi = async (data) => {
    try {
      for (const product of data) {
        await axios.post('http://localhost:1337/api/produits', {
          data: {
            Nom: product.Nom,
            Description_longue: product.Description,
            Qte_stock: product.Quantite_en_stock,
            Qte_citique: product.Quantite_critique,
            Prix_vente: product.Prix_de_vente,
            Prix_achat: product.Prix_d_achat,
          },
        });
      }
      console.log('Data uploaded to Strapi successfully');
    } catch (error) {
      console.error('Error uploading data to Strapi:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Produits importés :</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Catégorie</th>
                <th>Quantité en stock</th>
                <th>Quantité critique</th>
                <th>Prix de vente</th>
                <th>Prix d'achat</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((product, index) => (
                <tr key={index}>
                  <td>{product.Nom}</td>
                  <td>{product.Description}</td>
                  <td>{product.Categorie}</td>
                  <td>{product.Quantite_en_stock}</td>
                  <td>{product.Quantite_critique}</td>
                  <td>{product.Prix_de_vente}</td>
                  <td>{product.Prix_d_achat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Load;