import React from 'react';
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../../redux/users-reducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void,
}

const SearchUsersForm: React.FC<PropsType> = (props) => {
    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: null }}
                validate={values => {}}
                onSubmit={(values:FilterType, { setSubmitting }) => {
                        props.onFilterChanged(values);
                        setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field as="select" name="friend">
                            <option value="null">All</option>
                            <option value="true">Only Followed</option>
                            <option value="false">Only UnFollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SearchUsersForm;