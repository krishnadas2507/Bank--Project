import React, { useEffect, useState } from 'react';
import './requested.css';
import { Link } from 'react-router-dom';
import data from './Data';
import quest from './Questions';
import {MdDeleteOutline , MdDelete} from 'react-icons/md'

function Request() {

  const [requestbox , setrequestbox] = useState(null);
  const [requestbox2 , setrequestbox2] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const localData = JSON.parse(localStorage.getItem('qus'))
  const [questions, setQuestion] = useState(localData ? localData: quest);

  const[input , setInput] = useState('')
  const[datas , setDatas] = useState([])

  const addData = () =>{
    setDatas([...datas,{list : input , id : Date.now()}])
    console.log(datas);
    setInput('')
  }

  const handleDelete = (id) => {
  setDatas(datas.filter((data)=> data.id !== id))
  };



  const [requestData , setrequestData] = useState({
    branchCode: '',
    branchName: '',
    customerName: '',
    customerAccountNumber: '',
    customerAccountType: '',
  });

  const handleUploadButtonClick = () => {
    localStorage.setItem('requestData', JSON.stringify(requestData));
    window.location.reload();
    localStorage.setItem('qus',JSON.stringify(quest));
    localStorage.setItem('proccedtocontinue', JSON.stringify(true));
    setproccedtocontinue(true)
    setrequestbox(false)
  };

  useEffect(()=>{
    const saveddata = JSON.parse(localStorage.getItem('requestData'))
    if(saveddata){
    setrequestData(saveddata);
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setrequestData((prevData) => ({ ...prevData, [name]: value }));
    console.log(e)
  };

 const [proccedtocontinue , setproccedtocontinue] = useState(
  JSON.parse(localStorage.getItem('proccedtocontinue'))|| false
 )

 const handleproccedtocontinue = ()=>{
  setrequestbox2(true);
  setproccedtocontinue(true);
 }

  const handleAnswerChange = (index, selectedAnswer) => {
    if (index >= 0 && index < questions.length) {
      // const question = questions[index];
      console.log(questions.answer, selectedAnswer);
      if (questions[index].answer === selectedAnswer) {
        const updated = [...questions];
        updated[index].answers = selectedAnswer;
        if (updated[index + 1]) {
          updated[index + 1].isVisible = true;
        }
        if(index===questions.length-1){
        
          setrequestbox(true)
        }
        setQuestion(updated);
      } else {
        alert('Please Select Correct Answer');
      }
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    const fileList = [];

    for (let i = 0; i < files.length; i++) {
      fileList.push(files[i].name);
    }

    setSelectedFiles(fileList);
  };
  

  const [selectedAccountNumber, setSelectedAccountNumber] = useState(false);

  const filteredAccounts = data.filter(
    (account) => account.customeraccountnumber === selectedAccountNumber
  );

  const handleAccountNumberClick = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
  };
 
  return (
    <div className='container-req'>
      <div className='body'>
        <div className='header-req'>
          <div className='head1'>
            <h1>REQUEST FORM</h1>
          </div>
          <div className='head2-req'>
            <Link to='/'>DASHBOARD</Link> / REQUEST FORM
          </div>
        </div>
        <div className='contents-req'>
          <div className='content-req'>
            <div className="items">
              <label htmlFor="">Branch Code*</label>
              <div>
                <input
                  className='inputs'
                  type="text"
                  name="branchCode"
                  id="branch-code"
                  value={requestData.branchCode}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Branch Code"
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Branch Name*</label>
              <div>
                <input
                  className='inputs'
                  type="number"
                  name="branchName"
                  id="branch-name"
                  value={requestData.branchName}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Branch-Name"
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Customer Name*</label>
              <div>
                <input
                  className='inputs'
                  type="text"
                  name="customerName"
                  id="customer-name"
                  value={requestData.customerName}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Customer Name"
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Customer Account Number*</label>
              <div>
                <input
                  className='inputs'
                  type="number"
                  name="customerAccountNumber"
                  id="customer-AC"
                  value={requestData.customerAccountNumber}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Customer Account Number"
                  onClick={(e) => handleAccountNumberClick(e.target.value)}
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Customer Account Type*</label>
              <div>
                <select className='input-select' name="customerAccountType" id="" value={requestData.customerAccountType}  onChange={(e) => handleInputChange(e)}>
                  <option value="">....select....</option>
                  <option value="">SA</option>
                  <option value="">CA</option>
                  <option value="">SA-NRE</option>
                  <option value="">SA-NRO</option>
                </select>
              </div>
            </div>
          </div>
          {selectedAccountNumber && (
            <div className='table-req'>
              <h2 className='h2-req'>Previous approved compensation claim</h2>
              <table>
                <thead>
                  <tr>
                    <th className='th-req'>Requested on</th>
                    <th className='th-req'>Compensation Amount(Rs.)</th>
                    <th className='th-req'>Reason For Compensation</th>
                    <th className='th-req'>Approved On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.id}>
                      <td>{account.requestedOn}</td>
                      <td>{account.compensation}</td>
                      <td>{account.reson}</td>
                      <td>{account.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="question">
                {questions.map((question, index) => (
                  <React.Fragment key={index}>
                    {question.isVisible && (
                      <div className="question-container">
                        <p className='question-text'>{question.question}</p>
                        <div className="radio-options">
                        <label>
                          <input
                            type="radio"
                            value="Yes"
                            checked={question.answers===true}
                            onChange={() => handleAnswerChange(index, true)}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            checked={question.answers===false}  
                            onChange={() => handleAnswerChange(index, false)}
                          />
                          No
                        </label>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
           { requestbox &&<div className='req-box'>
            <p className='req-box-para'>Please Upload Your Compensation Request Letter*</p>
            <div className='req-box-file'>
              <div className='req-box-file1'>
              <input type="file" size={5} onChange={handleFileInputChange} multiple />
              </div>
              <div className='req-box-btn'>
                <button onClick={handleUploadButtonClick}>upload</button>
              </div>
            </div>
            <ul>
              <li>upload a maximum of five files</li>
              <li>Each with a maximum of 2 MB</li>
              <li>Allowed file types of doc,pdf and excel </li>
            </ul>
             
            {selectedFiles.length > 0 && (
                <div className='req-filename'>
                  {selectedFiles.map((fileName, index) => (
                    <div key={index}>
                      <button className='delete-button' onClick={() => handleDeleteFile(index)}>
                        <MdDeleteOutline />
                      </button>
                      <span>{fileName}</span>
                    </div>
                  ))}
                </div>
              )}
           </div>}
           {proccedtocontinue &&
          (<div className='procced'>
            <button className='procced-btn' onClick={handleproccedtocontinue} >Procced to continue</button>
          </div>)
          }
        </div>
       {requestbox2 && (
        
        <div className='foot-contents-req'>
          <div className='foot-content-req'>
            <div className="items">
              <label htmlFor="">Date of complaint*</label>
              <div>
                <input
                  className='inputs'
                  type="date"
                  name=""
                  id=""
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Date of occurence of incident*</label>
              <div>
                <input
                  className='inputs'
                  type="date"
                  name=""
                  id=""
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Date of identification of incident*</label>
              <div>
                <input
                  className='inputs'
                  type="date"
                  name=""
                  id=""
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Debit GL a/c*</label>
              <div>
                <input
                  className='inputs'
                  type="text"
                  name=""
                  id=""
                  placeholder="Customer Name"
                />
              </div>
            </div>
            <div className="items">
              <label htmlFor="">Breif discription of the incident*</label>
              <div>
              <textarea name="" id="" cols="60" rows="10"></textarea>
              </div>
              </div>

            <div className="items">
              <label htmlFor="">Reason for compensation*</label>
              <div>
              <textarea name="" id="" cols="60" rows="10"></textarea>
              </div>
            </div>
            
            <div className="items">
              <label htmlFor="">Compensation claimed(Rs.)*</label>
              <div>
                <input
                  className='inputs'
                  type="text"
                  name=""
                  id=""
                  placeholder="Compensation claimed(Rs.)"
                />
              </div>
            </div>

            <div className="items">
              <label htmlFor="">Attachment</label>
              <div className='file-input'>
                <input
                  className='inputs'
                  type="file"
                  name=""
                  id=""
                  placeholder=""
                />
              </div>
            </div>
             
            <div className='items'>
              <label htmlFor="">Recommender Name*</label>
            <div className='todo-div'>
            <div className='input-todo'>
            <input className='inputs' type="text" placeholder='Enter a name or email address' value={input} onChange={(event)=>setInput(event.target.value)} />
            </div>
            <div className='todo'><button className='adddata' onClick={addData}>+</button></div>
            </div>
            <ul className='list'>
      {
        datas.map((data)=>(
          <li className='list-items'><div className='list-items-list'>{data.list}</div>
          <span>< MdDelete className='list-items-icons'id="delete" onClick={() => handleDelete(data.id)}/></span>
          </li>

        ))
      }
      </ul>
            </div>
         <div className='submit'>
          <button className='submit-btn'>Submit</button>
         </div>
          </div>
        </div>
       )}
       <hr className='horizontal-line-req' />
      </div>
    </div>
    
  );
}

export default Request;

