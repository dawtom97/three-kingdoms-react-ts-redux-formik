import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Children, ReactElement, useState } from 'react';
import { object, string } from 'yup';
import { heroes } from '../../constants/playerHeroes';
import * as Styled from './styles';

export type HeroCardProps = {
  avatar?: string;
};

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

export const StartPage = () => {
  return (
    <Styled.Container>
      <Styled.InnerWrapper>
        <FormikStepper
          initialValues={{ name: '', motto: '', child: '' }}
          onSubmit={async (values: any) => {
            await sleep(500);
            console.log(values);
          }}
        >
          <FormikStep
            label='Choose your hero'
            validationSchema={object({
              name: string().required('You must choose your character'),
            })}
          >
            <Styled.HeroesBox>
              {heroes.map(({ name, avatar }) => (
                <label key={name}>
                  <Field type='radio' name='name' value={name} />
                  <Styled.HeroCard avatar={avatar}>
                    <h3>{name}</h3>
                  </Styled.HeroCard>
                </label>
              ))}
            </Styled.HeroesBox>
          </FormikStep>

          <FormikStep
            label='Choose your hero'
            validationSchema={object({
              child: string().min(5, 'Too short').max(40, 'Too long').required('Required'),
            })}
          >
            <Field type='text' name='child' label='Your family motto' />
          </FormikStep>
          <FormikStep
            label='Choose your hero'
            validationSchema={object({
              motto: string().min(5, 'Too short').max(40, 'Too long').required('Required'),
            })}
          >
            <Field type='text' name='motto' label='Your family motto' />
          </FormikStep>
        </FormikStepper>
      </Styled.InnerWrapper>
    </Styled.Container>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}
export const FormikStep = ({ children }: FormikStepProps) => <>{children}</>;

export const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues> | any) => {
  const childrenArray = Children.toArray(children) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];


  const isLastStep = () => step === childrenArray.length - 1;

  return (
    <>
      <Styled.StepsBar>
        {childrenArray.map((child, index) => (
          <Styled.StepsBarItem isCompleted={index <= step} key={index}>
            {index + 1}
          </Styled.StepsBarItem>
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
          <Form autoComplete='off'>
            <h2>{props.label}</h2>
            {currentChild}
            {step > 0 ? (
              <button type='button' onClick={() => setStep((prev) => prev - 1)}>
                Back
              </button>
            ) : null}
            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
