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

function EmployeeForm({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
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
    onSubmitSuccess();
  };

  return (
    <>
      <form id="create-employee" onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="first-name"
          className={`${errors["firstName"] ? "error-label" : ""}`}
        >
          First Name
        </label>
        <input
          {...register("firstName")}
          type="text"
          id="first-name"
          className={`${errors["firstName"] ? "error-input" : ""}`}
        />

        <label
          htmlFor="last-name"
          className={`${errors["lastName"] ? "error-label" : ""}`}
        >
          Last Name
        </label>
        <input
          {...register("lastName")}
          type="text"
          id="last-name"
          className={`${errors["lastName"] ? "error-input" : ""}`}
        />

        <label
          htmlFor="date-of-birth"
          className={`${errors["dateOfBirth"] ? "error-label" : ""}`}
        >
          Date of Birth
        </label>
        <input
          {...register("dateOfBirth")}
          id="date-of-birth"
          type="text"
          className={`${errors["dateOfBirth"] ? "error-input" : ""}`}
        />

        <label
          htmlFor="start-date"
          className={`${errors["startDate"] ? "error-label" : ""}`}
        >
          Start Date
        </label>
        <input
          {...register("startDate")}
          id="start-date"
          type="text"
          className={`${errors["startDate"] ? "error-input" : ""}`}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label
            htmlFor="street"
            className={`${errors["street"] ? "error-label" : ""}`}
          >
            Street
          </label>
          <input
            {...register("street")}
            id="street"
            type="text"
            className={`${errors["street"] ? "error-input" : ""}`}
          />

          <label
            htmlFor="city"
            className={`${errors["city"] ? "error-label" : ""}`}
          >
            City
          </label>
          <input
            {...register("city")}
            id="city"
            type="text"
            className={`${errors["city"] ? "error-input" : ""}`}
          />

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
          <label
            htmlFor="zip-code"
            className={`${errors["zipCode"] ? "error-label" : ""}`}
          >
            Zip Code
          </label>
          <input
            {...register("zipCode")}
            id="zip-code"
            type="number"
            className={`${errors["zipCode"] ? "error-input" : ""}`}
          />
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
      </form>
      <button type="submit" form="create-employee">
        Save
      </button>
      {Object.keys(errors).length > 0 && (
        <span
          className="form-error"
          onClick={() => {
            console.log(errors);
          }}
        >
          Need to fill in all fields
        </span>
      )}
    </>
  );
}

export default EmployeeForm;
