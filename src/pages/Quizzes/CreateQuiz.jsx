import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, CircleCheck, Trash2, ChevronDown, Plus} from "lucide-react"
{/* Please note that all the fields in this jsx is customized using the same styling in index.css for consistency */}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
        value ? "bg-purple-600" : "bg-gray-700"
      }`}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-[#151518] rounded-full shadow transition-transform duration-300 ${
        value ? "translate-x-6" : "translate-x-0.5"
      }`} />
    </button>
  );
}

{/* QuizDetail Card */}
function DetailCard(){
  const [category, setCategory] = useState("Science");
  const [difficulty, setDifficulty] = useState("Easy");

  return(
    <div className="w-full bg-[#151518] p-8 rounded-md border border-[#484848]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Quiz Detail</h1>
        <p className="text-gray-400">Basic information about your quiz</p>
      </div>
        

      {/* Input fields */}
      <div className="mt-5 text-white font-semibold ">
        {/* Quiz Title */}
        <div className="mb-5">
          <p>Quiz Title</p>
          <input type="text" placeholder="Enter quiz title..."/>
        </div>

        {/* Quiz Description */}
        <div className="mb-5">
          <p>Quiz Title</p>
          <input type="text" className="pb-20" placeholder="Enter quiz description..."/>
        </div>

        {/* Category and Difficulty select */}
        <div className="flex gap-5">
          <div className="w-full">
            <p>Category</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Science">Science</option>
              <option value="Mathmetics">Mathmetics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div className="w-full">
            <p>Difficulty Level</p>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

{/* QuizSettings Card */}
function SettingsCard(){
  const [RandomizeUnenabled, RandomizeEnabled] = useState(false);
  const [ResultUnenabled, ResultEnabled] = useState(false);

  return(
    <div className="bg-[#151518] p-8 pb-5 rounded-md border border-[#484848]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Quiz Settings</h1>
        <p className="text-gray-400">Configure how your quiz workss</p>
      </div>

      {/* Time */}
      <div className="mt-5 text-white font-semibold ">
        {/* Quiz Title */}
        <div>
          <p>Time Limit</p>
          <div className="mt-2 flex items-center border border-[#484848] bg-[#1f1f20] rounded-md px-3">
            <Clock className="w-5 h-5 text-gray-400 mr-2" />
            <input type="number" 
                  onChange={(e) => { if (e.target.value < 1) e.target.value = 1 }}
                  className="-mt-px bg-transparent border-none text-white"/>
            <p className="text-[#767676]">minutes</p>
          </div>
        </div>

        {/* Fields */}
        <div className="mt-7">
          <p>Passing Score</p>
          <div className="mt-2 flex items-center border border-[#484848] bg-[#1f1f20] rounded-md px-3">
            <CircleCheck className="w-5 h-5 text-gray-400 mr-2" />
            <input type="number" 
                  onChange={(e) => { if (e.target.value < 0) e.target.value = 0
                    else if (e.target.value > 100) e.target.value = 100
                   }}
                  className="-mt-px bg-transparent border-none text-white"/>
            <p className="text-[#767676]">%</p>
          </div>
        </div>

        {/* Toggles */}      
        <div className="mt-6 flex">
          <div className="w-full">
            <h1 className="text-lg font-bold text-white">Randomize Questions</h1>
            <p className="text-gray-400 mt-2">Show questions in random order</p>
          </div>
          <div className="mt-3">
            <Toggle value={RandomizeUnenabled} onChange={RandomizeEnabled}/>
          </div>
        </div>

        <div className="mt-6 flex">
          <div className="w-full">
            <h1 className="text-lg font-bold text-white">Immediate Results</h1>
            <p className="text-gray-400 mt-2">Show results for each question</p>
          </div>
          <div className="mt-3">
            <Toggle value={ResultUnenabled} onChange={ResultEnabled} />
          </div>
        </div>
      </div>
    </div>
  )
}

{/* Step 1 */}
function BasicInfo(){
  return (
    <div className="grid grid-cols-5 gap-5 items-start">
      <div className="col-span-3">
        <DetailCard></DetailCard>
      </div>
      
      <div className="col-span-2">
        <SettingsCard></SettingsCard>
      </div>
    </div>
  )
}

{/* Answer Boxes AKA step 2 */}
function AnswerOption({ label, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition bg-[#1f1f20]
        ${selected ? "border-purple-600" : "border-[#484848] hover:border-gray-400"}`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
        ${selected ? "border-purple-600" : "border-gray-600"}`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
      </div>
      <span className="text-white font-semibold">{label}</span>
    </div>
  );
}

function QuizQuestion( quizQuestion ){
  const [questionType, setQuestionType] = useState("Multiple_Choice");
  
  const [selected, setSelected] = useState(null);
  const options = ["Solar Power", "Wind Power", "Natural Gas", "Hydroelectric Power"];
  
  return(
    <div className="bg-[#151518] p-8 pb-5 rounded-md border border-[#484848]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-white">Quiz Questions</h1>
        <p className="text-gray-400">Create and manage your quiz questions</p>
      </div>
      
      {/* Question Box */}
      <div className="text-white bg-[#19191b] border border-[#484848] rounded-md mb-3">
       {/* Question Box Header */}
       <div className="flex justify-between items-center m-5">
         <div>
           <h1 className="font-bold text-lg">Question {1}</h1>
         </div>
        
         <div className="flex">
           <div className="flex items-center mr-5">
             <h1 className="font-bold mr-3">Points: </h1>
             <div className="w-20 h-10 flex items-center justify-start pl-3 border border-[#484848] rounded-lg">10</div>
           </div>
        
           <div className="relative w-50 mr-5 -mt-1">
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full h-10 rounded-lg appearance-none cursor-pointer pt-1.5 font-semibold">
              
              <option value="Multiple_Choice">Multiple Choice</option>
              <option value="Written">Written</option>
              <option value="Fill_blank">Fill in the blank</option>
            </select>
            <ChevronDown className="absolute right-2 top-6 -translate-y-3/7 h-10 text-gray-400 pointer-events-none" />
          </div>

          <button className="flex items-center cursor-pointer" >
            <Trash2 className="text-red-600"></Trash2>
          </button>
         </div>
       </div>

       {/* Question Text Box */}
       <div>
        <div className="m-5 -mt-2">
          <h1 className="font-semibold">Question Text</h1>
          <div className="border border-[#484848] bg-[#1f1f20] rounded-md mt-2">
            <p className="m-3 font-medium h-20">Which of the folling is NOT a renewable energy source?</p>
          </div>
        </div>

        {/* Answer boxes */}
        <div className="flex flex-col gap-3 m-5">
          <p className="text-white font-semibold">Answer Options</p>
          {options.map((opt, i) => (
            <AnswerOption
              key={i}
              label={opt}
              selected={selected === i}
              onSelect={() => setSelected(i)}
            />
          ))}
        </div>
       </div>
      </div>

      {/* Add question */}
      <div className="flex border border-dashed border-[#4c4c4e] text-white justify-center rounded-md p-2 hover:bg-purple-600 transition cursor-pointer">
        <Plus className="mr-3"></Plus>
        <h1 className="font-bold">Add Question</h1>
      </div>
    </div>
  )
}

{/* Final Component */}
function CreateQuiz(){
  const [step, setStep] = useState(1);

  return (
    <div className="border bg-[#101010] p-5 pb-10">
      <div className="flex justify-between w-full items-start pb-10">
        <div>
          <div className="flex rounded-md">
            <button className="flex items-center justify-center text-white rounded-xl border border-[#484848] w-12 h-12 mt-2 mr-5 hover:bg-[#7c3aed] transition cursor-pointer">
              <ChevronLeft></ChevronLeft>
            </button>

            <div>
              <h3 className="text-white font-bold text-3xl">Create New Quiz</h3>
              <p className="text-gray-400 ">Add questions, set answers and configure quiz settings</p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex justify-center mt-3">
            <button className="flex justify-between rounded-xl px-5 py-2.5 mr-3 border border-[#484848] text-white font-bold hover:bg-[#7c3aed] transition cursor-pointer">
              <p>Save draft</p>
            </button>
            
            <button className="flex justify-between rounded-xl px-5 py-2.5 border border-[#484848] text-white font-bold bg-[#7c3aed] hover:bg-purple-500 transition cursor-pointer">
              <p>Preview</p>
            </button>
          </div>
        </div>
      </div>

      {step === 1 && <BasicInfo/>}
      {step === 2 && <QuizQuestion />}

      <div className="flex justify-end gap-3 mt-5">
        <di>
          <button onClick={() => setStep(step - 1)} className="flex justify-between rounded-xl px-5 py-2.5 mr-3 border border-[#484848] text-white font-bold hover:bg-[#7c3aed] transition cursor-pointer">
            <ChevronLeft /> Prev
          </button>
        </di>

        {step === 1 && (
          <button onClick={() => setStep(2)} className="flex justify-between rounded-xl px-5 py-2.5 border border-[#484848] text-white font-bold bg-[#7c3aed] hover:bg-purple-500 transition cursor-pointer">
            Next <ChevronRight />
          </button>
        )}

        {step === 2 && (
          <button /*onClick={}*/ className="flex justify-between rounded-xl px-5 py-2.5 border border-[#484848] text-white font-bold bg-[#7c3aed] hover:bg-purple-500 transition cursor-pointer">
            Preview & Publish
          </button>
        )}
      </div>
    </div>
  )
}


export default CreateQuiz