import { useState} from 'react'
import  Axios from 'axios'; 

const Main = () => {
    const [data, setData] = useState("");
    const [x, setX] = useState("");

    const createDownloadUrl = () => {
        if(data.length > 3)
        {
            fetchData(data);
            return;
        }

        alert("Geçerli bir URL giriniz.");
    }

    const createUrl = (event:any) => {
        const regexPattern = /https:\/\/(?:www\.)?instagram\.com\/reel\/[a-zA-Z0-9_-]+\/?/g;
        const matches = event.target.value.match(regexPattern);

        if(matches){
            setData(event.target.value)
        }
    }

    const fetchData =async (url:string) => {
        try {
            let response = await Axios(
              {
                  method : 'get',
                  url : '/api/dw',
                  params : {
                    url : url
                  }
              }
             );
        
             let result = await response;
             setX(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <section className="bg-jumbotron p-24">
            <div className="container mx-auto">
                <div className="flex flex-col justify-center text-center">
                <h3 className="text-xl md:text-3xl text-white uppercase font-bold">Download Instagram Reels & Post</h3>
                <h2 className="text-sm md:text-md text-white capitalize font-medium">Download Reels & Post from Instagram</h2>
                <div className="mt-12 w-full">
                    <input className="py-4 px-6 text-left w-full md:w-6/12" placeholder="Enter instagram link" onChange={createUrl}/>
                    <button className="w-full md:w-2/12 py-4 px-6 text-center bg-[#333] text-white" onClick={createDownloadUrl}>Download</button>
                </div>
                </div>
            </div>
            <p className="text-center">Example URL: https://www.instagram.com/reel/xxx</p>
            {x ? <a target="_blank" className="text-center block pt-8" href={x}>Video is prepared. Click and download!</a> : ''}
            </section>
    
            <section className="bg-white shadow-lg p-24">
            <div className="container mx-auto">
            <div className="md:flex">
                <div className="bg-white shadow-lg border w-full md:w-3/12 p-4 text-center radius mr-4">
                <h3 className="uppercase font-medium">Security</h3>
                </div>
                <div className="bg-white shadow-lg border w-full md:w-3/12 p-4 text-center radius mr-4">
                <h3 className="uppercase font-medium">Security</h3>
                </div>
                <div className="bg-white shadow-lg border w-full md:w-3/12 p-4 text-center radius mr-4">
                <h3 className="uppercase font-medium">Security</h3>
                </div>
                <div className="bg-white shadow-lg border w-full md:w-3/12 p-4 text-center radius">
                <h3 className="uppercase font-medium">Security</h3>
                </div>
            </div>
            <div className="flex flex-col mt-20">
                <h3 className="text-center font-bold uppercase text-2xl mb-8">How To Use?</h3>
                <p className="mx-auto md:w-8/12">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            </div>
      </section>
      </main>
    );
}

export default Main;