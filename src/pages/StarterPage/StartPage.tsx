import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { Children, ReactElement, useState } from "react";
import { object, string } from "yup";
import { FormikSelect } from "../../components/molecules/FormikSelect/FormikSelect";
import { StepsBarItem } from "../../components/molecules/StepsBarItem/StepsBarItem";
import { initialArmy, initialSkills } from "../../constants/initialValues";
import { heroes } from "../../constants/playerHeroes";
import * as story from "../../constants/playerHistoryOptions";
import * as Styled from "./styles";

export type HeroCardProps = {
  avatar?: string;
};

export const StartPage = () => {
  const [skills, setSkills] = useState<any>(initialSkills);
  const [army, setArmy] = useState<any>(initialArmy);
  const [newCharacter, setNewCharacter] = useState<any>();

  const increaseSkillsOrArmy = (payload:any,state:any,cb:(a:any[])=>void) => {
    const payloadEntries = Object.entries(payload).flat();
    const findValue = state.find((item:any) => item.name === payloadEntries[0]);
    findValue.value = findValue.value + payloadEntries[1];
    const filtered = state.filter((item:any) => item !== findValue);
    cb([...filtered, findValue]);
  }

  const generateCharacter = () => {
    const character = {
      skills:skills,
      money:2000,
      stone:50,
      wood:100,
      prestige: 10,
      army:army
    }
    setNewCharacter(character);
    console.log(newCharacter);
  }

  return (
    <Styled.Container>
      <Styled.InnerWrapper>
        <FormikStepper
          initialValues={{
            name: "",
            motto: "",
            career:""
          }}
          onSubmit={async (values: any) => {
            const updatedSkills = [values.childhood, values.youth, values.present, values.future];
            const updatedArmy = [values.career, values.career1]
            updatedSkills.forEach((skill) => increaseSkillsOrArmy(skill,skills,setSkills));
            updatedArmy.forEach((career) => increaseSkillsOrArmy(career,army,setArmy));
            generateCharacter();
          }}
        >
          <FormikStep
            label="character"
            validationSchema={object({
              name: string().required("You must choose your character"),
            })}
          >
            <Styled.HeroesBox>
              {heroes.map(({ name, avatar }) => (
                <label key={name}>
                  <Field type="radio" name="name" value={name} />
                  <Styled.HeroCard avatar={avatar}>
                    <h3>{name}</h3>
                  </Styled.HeroCard>
                </label>
              ))}
            </Styled.HeroesBox>
          </FormikStep>

          <FormikStep label="family">
            <Field
              name="childhood"
              component={FormikSelect}
              options={story.childOptions}
            />
             <Field
              name="youth"
              component={FormikSelect}
              options={story.youthOptions}
            />
            <Field
              name="present"
              component={FormikSelect}
              options={story.presentOptions}
            />
            <Field
              name="future"
              component={FormikSelect}
              options={story.futureOptions}
            />
          </FormikStep>
          <FormikStep
            label="country"
            validationSchema={object({
              motto: string()
                .min(5, "Too short")
                .max(40, "Too long")
                .required("Required"),
            })}
          >
            <Field type="text" name="motto" label="Your family motto"/>
            <Field
              name="career"
              component={FormikSelect}
              options={story.careerOptions}
            />
            <Field
              name="career1"
              component={FormikSelect}
              options={story.careerOptions}
            />
          </FormikStep>
        </FormikStepper>
      </Styled.InnerWrapper>
    </Styled.Container>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}
export const FormikStep = ({ children }: FormikStepProps) => <>{children}</>;

export const FormikStepper = ({
  children,
  ...props
}: FormikConfig<FormikValues> | any) => {
  const childrenArray = Children.toArray(
    children
  ) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;

  return (
    <>
      <Styled.StepsBar>
        {childrenArray.map((child, index) => (
          <StepsBarItem
            key={index}
            label={child.props.label}
            isCompleted={index <= step}
            index={index}
          />
        ))}
      </Styled.StepsBar>

      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values: any, helpers: any) => {
          if (step === childrenArray.length - 1) {
            await props.onSubmit(values, helpers);
          } else {
            setStep((prev) => prev + 1);
          }
        }}
      >
        {({ isSubmitting }: any) => (
          <Form autoComplete="off">
            <h2>{props.label}</h2>
            {currentChild}
            {step > 0 ? (
              <button type="button" onClick={() => setStep((prev) => prev - 1)}>
                Back
              </button>
            ) : null}
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
