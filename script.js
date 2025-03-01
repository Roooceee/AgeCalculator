const day_field = document.querySelector("#day");
const month_field = document.querySelector("#month");
const year_field = document.querySelector("#year");

const submit = document.querySelector("#submit");

function showError(inputField, message,classCSS=null) {
   if(classCSS!=null){
      inputField.className= `${classCSS}`;
   }
   if(message!=""){
      inputField.insertAdjacentHTML("afterend",message)
   }
}   

function clearError(field){
   if(field.className==="inputerror"){
      field.className="";
   }
   field.className = "";
}
   
   function calculAgeExact(day, month,year){
      
      isFieldNoEmpty = true;
      
      if(day_field.value.trim()==="") isFieldNoEmpty=false;
      if(month_field.value.trim()==="") isFieldNoEmpty=false;
      if(year_field.value.trim()==="") isFieldNoEmpty=false;
      console.log("isFieldNoEmpty : "+isFieldNoEmpty)

      isAllValid = true;

      if(!verifyDay(day)) isAllValid = false;
      if(!verifyMonth(month)) isAllValid = false;
      if(!verifyYear(year)) isAllValid = false;
      console.log("isAllValid : "+isAllValid)
      

      if(isAllValid && isFieldNoEmpty){

         const dateBorn = new Date(year, month-1, day); // Crée la date de naissance avec les parametre day month et year
         const dateCurrent = new Date();
         
         if(dateBorn<dateCurrent){
            
            if(verifyDateExist(dateBorn,day,month,year)!=false){
      
               // Calcul de l'âge
               let age_year = dateCurrent.getFullYear() - dateBorn.getFullYear();
               let age_month = dateCurrent.getMonth() - dateBorn.getMonth();
               let age_date = dateCurrent.getDate() - dateBorn.getDate();
   
               //  Ajuster si les jours sont négatifs
               if (age_date < 0) {
                  age_month--;
                  age_date=0;
                  monthDayBirthday = new Date(dateBorn.getFullYear(),dateBorn.getMonth()+1,0).getDate();
                  age_date = monthDayBirthday-dateBorn.getDate();
                  age_date += dateCurrent.getDate();
   
               }
   
               // 🔹 Ajuster si les mois sont négatifs
               if (age_month < 0) {
                  age_month += 12;
                  age_year--;  // On emprunte une année
               }
   
               
               const result_year = document.querySelector("#result_year");
               const result_text_year = document.querySelector("#text_result_year")
               const textYear = age_year<= 1 ? "year" : "years";
               result_year.textContent= age_year
               result_text_year.textContent =textYear;
               
               const result_month = document.querySelector("#result_month");
               const result_text_month = document.querySelector("#text_result_month")
               const textMonth = age_month<= 1 ? "month" : "months";
               result_month.textContent = age_month
               result_text_month.textContent = textMonth;
               
               const result_date = document.querySelector("#result_date");
               const textDay = age_date<= 1 ? "day" : "days";
               const result_text_day = document.querySelector("#text_result_date")
               result_date.textContent = age_date
               result_text_day.textContent = textDay;
      
            }
         }
         else {
            showError(day_field, "","input_error");
            showError(month_field, "","input_error");
            showError(year_field, "","input_error");
            showError(inputdiv,"<p class='p_error'>Must be in the past<p>",);
         }

      }
         
      
      
   }
   
   
   function verifyDateExist(dateBorn,day,month,year){

         console.log("VerifyDateExist")

         // Vérifie si l'année ou le mois ou le jour crée grace a la fonction date n'est pas égal aux parametre envoyé dans la fonction
         if(dateBorn.getFullYear() != year || dateBorn.getMonth() != month-1 || dateBorn.getDate() != day){
            console.log("Date n'existe pas")

            showError(day_field, "","input_error");
            showError(month_field, "","input_error");
            showError(year_field, "","input_error");
            showError(inputdiv,"<p class='p_error'>Must be a date valid</p>")
            return false
         }
   }



function verifyDay(day){

   if(day){
      if(day>=1 && day<=31){
         clearError(day_field);
         return true;
      }
      console.log("Day no valid")
      showError(day_field, "<p class='p_error'>Must be a valid day</p>","input_error")
      return false;
   }


}
function verifyMonth(month){

   if(month){
      if(month>=1 && month<=12){
         clearError(month_field)
         return true;
      }
      showError(month_field, "<p class='p_error'>Must be a valid month</p>","input_error")
      return false;
   }


}
function verifyYear(year){

   if(year){
      if(year>=1900){
         clearError(year_field)
         return true;
      }
      showError(year_field, "<p class='p_error'>Must be a valid year</p>","input_error")
      return false;
   }

}



submit.addEventListener("click",(e)=>{
   
   e.preventDefault();

   p_error = document.querySelectorAll(".p_error");
   if(p_error){
      p_error.forEach(element => {
         element.remove();
      });
   }

   if(day_field.value.trim()===""){
      showError(day_field, "<p class='p_error'>This field is required</p>","input_error")
   }
   if(month_field.value.trim()===""){
      showError(month_field, "<p class='p_error'>This field is required</p>","input_error")
   }
   if(year_field.value.trim()===""){   
      showError(year_field, "<p class='p_error'>This field is required</p>","input_error")
   }

   submit.id="submitsend";
   calculAgeExact(day_field.value, month_field.value, year_field.value)



});
