import React from 'react';
import { Link } from 'react-router';
import Label from 'konux/common/components/Label';
import * as pageTypes from '../constants/pageTypes';
import FormGroup from 'konux/common/components/FormGroup';

class FooterHelper {
    static getFooter(pageType){
        switch(pageType) {
            case pageTypes.PAGE_RESTORE_PASSWORD:
            case pageTypes.PAGE_COMPLETE_REGISTRATION:
                return (
                    <FormGroup center>
                        <Label className="lbl-10">By signing up, you agree to
                            the Konux <Link to="">Terms of Service</Link> and <Link to="">Policies.</Link></Label>
                    </FormGroup>
                );
            break;
            case pageTypes.PAGE_FORGOT_PASSWORD:
                return (
                    <FormGroup center>
                        <Label center className="lbl-10">If you still need help, contact <Link> Konux Support.  </Link></Label>
                    </FormGroup>
                );
            break;
            case pageTypes.PAGE_REQUEST_INVITE:
                return (
                    <div>
                        <FormGroup center>
                            <Label className="lbl-10">If you still need help, contact <Link to="/"> Konux Support.</Link></Label>
                        </FormGroup>
                        <FormGroup center>
                            <Label className="lbl-10">Already have an account?  <Link to="/login"> Log In.</Link></Label>
                        </FormGroup>
                    </div>
                );
            break;
            default:
                return (
                    <FormGroup center>
                        <Label className="lbl-10">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </Label>
                        <Label className="lbl-10">or</Label>
                        <Label className="lbl-10">
                            <Link to="">Need help?</Link>
                        </Label>
                    </FormGroup>
                );
            break;
        }
    }
}

export default FooterHelper;