import i18n from 'i18n';
import {getSettings} from '../../settings';
const settings = getSettings();

/**
 * Will redirect user to login page if not logged in.
 * @param {Function} next
 */
export function* isLoggedIn(next) {
  if(this.isAuthenticated()) return yield next;
  else {
    // this.flash('error', i18n.__('Please log in.'));
    this.redirect(settings.adminUrl + '/login');
  }
}

/**
 * Will redirect user to main admin page if logged in.
 * @param {Function} next
 */
export function* isNotLoggedIn(next) {
  if(this.isUnauthenticated()) return yield next;
  else {
    this.redirect(settings.adminUrl + '/admin');
  }
}