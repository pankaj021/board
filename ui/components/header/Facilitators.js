import React from 'react';

const presenters = [
    {
       "_id": "1FqxQuWMU90384151",
       "boardId": "FMDvpND-v74727119",
       "fullName": "pankaj",
       "nickName": "Pankaj",
       "isPresent": true,
       "frequency": 0,
       "createTS": "2019-10-06T11:30:08.495Z"
    },
    {
       "_id": "t520BdiGC44800681",
       "boardId": "FMDvpND-v74727119",
       "fullName": "ewsf",
       "nickName": "Ewsfwras",
       "isPresent": true,
       "frequency": 0,
       "createTS": "2019-10-06T11:30:22.033Z"
    }
];

class Facilitators extends React.Component{
    getPresentersList(){
        return presenters.map((presenter, index) => (
            <div key={presenter._id} className='presenter d-flex align-ct'>
                {index ? <span style={{margin: '0px 8px'}}>,</span> : null}
                <span className='mg-r-8'>{presenter.nickName || "Somebody"}</span>
                <img className='f-next-i' src='/icons/next.svg' alt='next' title="Next"/>
            </div>
        ))
    }
    render(){
        const imgPath = presenters.length > 1 ? '/icons/presenters.svg' : '/icons/presenter.svg';
        const imgClass = presenters.length > 1 ? 'f-logo' : 'f-logo-small'
        return (
            <div className='facilitators mg-r-48'>
                <img className={imgClass} src={imgPath} alt='Facilitators'/>
                <span className='facilitators-title'>Facilitators</span>
                <span style={{margin: '0px 8px'}}>:</span>
                <div className='presenters d-flex align-ct'>{this.getPresentersList()}</div>
            </div>
        )
    }
}

export default Facilitators;