import React from 'react' ;

import { useSelector } from 'react-redux' ;
import { useLocation, useNavigate } from 'react-router-dom' ;
import './HomeMainbar.css' ;
import QuestionList from './QuestionList' ;

const HomeMainbar = () => {

    const location = useLocation()
    const user = 1;
    const navigate = useNavigate()

    const questionsList = useSelector( state => state.questionsReducer )
      
      const checkAuth = () => {
         if(user === null){
          alert("Login or Signup to Ask Question") ;
          navigate('/Auth')
         }else{
          navigate('/AskQuestion')
         }
      }
      

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className="ask-btn">Ask Question</button>        
      </div>
      <div>
      {        questionsList.data === null ?
               <h1>Loading...</h1> :
        <>
           <p>{ questionsList.data.length } questions</p>
                <QuestionList questionsList= {questionsList.data} />
        </>
      } 
      </div>
      
    </div>
  )
}

export default HomeMainbar ;
