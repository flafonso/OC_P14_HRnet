import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addEmployee } from "./employeeSlice";
import SelectMenu from "../../components/selectMenu/SelectMenu";

import { stateList, departmentList } from "../../data/data";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().min(1),
  startDate: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  department: z.string().min(1),
});

export type FormFields = z.infer<typeof schema>;

function EmployeeForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    dispatch(addEmployee(data));
    reset();
  };

  return (
    <>
      <form id="create-employee" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first-name">First Name</label>
        <input {...register("firstName")} type="text" id="first-name" />

        <label htmlFor="last-name">Last Name</label>
        <input {...register("lastName")} type="text" id="last-name" />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input {...register("dateOfBirth")} id="date-of-birth" type="text" />

        <label htmlFor="start-date">Start Date</label>
        <input {...register("startDate")} id="start-date" type="text" />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input {...register("street")} id="street" type="text" />

          <label htmlFor="city">City</label>
          <input {...register("city")} id="city" type="text" />

          <label htmlFor="state">State</label>
          <Controller
            name="state"
            control={control}
            defaultValue={stateList[0].value}
            render={({ field }) => (
              <SelectMenu
                name="state"
                id="state"
                onChange={field.onChange}
                defaultValue={field.value}
                options={stateList}
              />
            )}
          />
          <label htmlFor="zip-code">Zip Code</label>
          <input {...register("zipCode")} id="zip-code" type="number" />
        </fieldset>

        <label htmlFor="department">Department</label>
        <Controller
          name="department"
          control={control}
          defaultValue={departmentList[0].value}
          render={({ field }) => (
            <SelectMenu
              name="department"
              id="department"
              onChange={field.onChange}
              defaultValue={field.value}
              options={departmentList}
            />
          )}
        />
        {Object.keys(errors).length > 0 && (
          <span className="form-error-message">Need to fill in all fields</span>
        )}
      </form>
      <button type="submit" form="create-employee">Save</button>
    </>
  );
}

export default EmployeeForm;
