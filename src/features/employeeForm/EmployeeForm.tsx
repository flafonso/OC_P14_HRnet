import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addEmployee } from "./employeeSlice";
import SelectMenu from "../../components/selectMenu/SelectMenu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { stateList, departmentList } from "../../data/data";

const schema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
      message:
        "First name should contain only letters, spaces, hyphens, or apostrophes",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
      message:
        "Last name should contain only letters, spaces, hyphens, or apostrophes",
    }),
  dateOfBirth: z
    .date({ message: "Date of birth is required" })
    .max(new Date(), { message: "Date of birth cannot be in the future" }),
  startDate: z.date({ message: "Start date is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 digits" })
    .max(10, { message: "Zip code cannot exceed 10 characters" })
    .regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Invalid zip code format" }),
  department: z.string().min(1, { message: "Department is required" }),
});

export type FormFields = z.infer<typeof schema>;

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

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
    const formattedData = {
      ...data,
      dateOfBirth: formatDate(data.dateOfBirth),
      startDate: formatDate(data.startDate),
    };
    dispatch(addEmployee(formattedData));
    reset();
    onSubmitSuccess();
  };

  const today = new Date();
  const range = (startDate: number, endDate: number) => {
    const rangeList = [];
    for (let start = startDate; start < endDate; start++) {
      rangeList.push(start.toString());
    }
    return rangeList;
  };
  const years = range(1900, today.getFullYear() + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) =>
                      changeYear(Number(value))
                    }
                  >
                    {years.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[date.getMonth()]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat="MM/dd/yyyy"
              className={`${errors["dateOfBirth"] ? "error-input" : ""}`}
            />
          )}
        />

        <label
          htmlFor="start-date"
          className={`${errors["startDate"] ? "error-label" : ""}`}
        >
          Start Date
        </label>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) =>
                      changeYear(Number(value))
                    }
                  >
                    {years.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[date.getMonth()]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat="MM/dd/yyyy"
              className={`${errors["startDate"] ? "error-input" : ""}`}
            />
          )}
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
            type="text"
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
